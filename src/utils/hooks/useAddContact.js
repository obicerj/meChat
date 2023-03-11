import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import createCombinedID from "../createCombinedID";

const useAddContact = () => {
  const addContact = async (currentUser, recipient) => {
    try {
      const combinedID = createCombinedID(currentUser.uid, recipient.uid)
      
      const userDocRef = doc(db, "users", currentUser.uid);
      const recipientDocRef = doc(db, "users", recipient.uid);

      const chatDocRef = doc(db, "chats", String(combinedID));
      const chatDocData = await getDoc(chatDocRef);

      const userChatDocRef = doc(db, "userChats", String(currentUser.uid));
      const recipientChatDocRef = doc(db, "userChats", String(recipient.uid));

      if(!chatDocData.exists()) {
        await setDoc(chatDocRef, { messages: [] });

        await updateDoc(userDocRef, {
          contacts: arrayUnion(recipient.uid),
        });

        await updateDoc(recipientDocRef, {
          contacts: arrayUnion(currentUser.uid),
        });

        const userChatInfo = {
          active: false,
          userInfo: {
            uid: recipient.uid,
          },
          lastMessage: {
            message: "Connected with user.",
            date: serverTimestamp(),
          },
        };

        await updateDoc(userChatDocRef, {
          [combinedID]: userChatInfo,
        });

        const recipientChatInfo = {
          ...userChatInfo,
          userInfo: {
            uid: currentUser.uid,
          },
        };

        await updateDoc(recipientChatDocRef, {
          [combinedID]: recipientChatInfo,
        });
      }
    } catch (err) {
      throw err.message;
    }
  };
  return addContact;
};

export default useAddContact;