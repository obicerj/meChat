import { useSelector } from "react-redux"
import { getUserState } from "../../features/auth/userSlice"
import { getConvoState } from "../../features/conversation/convoSlice";
import { 
  arrayRemove, 
  arrayUnion, 
  doc, 
  getDoc, 
  increment, 
  Timestamp,
  updateDoc 
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

const useMessage = () => {
  const { chatId, recipient } = useSelector(getConvoState);
  const { user: currentUser } = useSelector(getUserState);

  const createLastMessage = (text) => {
    const userChatDocRef = doc(db, "userChats", currentUser.uid);
    const recipientChatDocRef = doc(db, "userChats", recipient.uid);

    // chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
    
    // console.log(chatId);
    // try {
      // await updateDoc(doc(db, "chats", chatId.toString()), {
      //   message: arrayUnion({
      //     id: uuid(),
      //     text,
      //     senderId: currentUser.uid,
      //     date: Timestamp.now(),
      //   }),
      // });

      // await updateDoc(userChatDocRef, {
      //     [chatId + ".lastMessage"]: {
      //       text,
      //     },
      //     [chatId + ".date"]: serverTimestamp(),
      //   });

      // await updateDoc(recipientChatDocRef, {
      //     [chatId + ".lastMessage"]: {
      //       text,
      //     },
      //     [chatId + ".date"]: serverTimestamp(),
      //   });


      
        // await updateDoc(doc(db, "chats", data.chatId), {
        //   message: arrayUnion({
        //     id: uuid(),
        //     text,
        //     senderId: currentUser.uid,
        //     date: Timestamp.now()
        //   })
        // });
    
        // await updateDoc(doc(db, "userChats", currentUser.uid), {
        //   [data.chatId + ".lastMessage"]: {
        //     text,
        //   },
        //   [data.chatId + ".date"]: serverTimestamp(),
        // });
    
        // await updateDoc(doc(db, "userChats", data.user.uid), {
        //   [data.chatId + ".lastMessage"]: {
        //     text,
        //   },
        //   [data.chatId + ".date"]: serverTimestamp(),
        // });

    // } catch (err) {
    //   throw err;
    // }
  };

  const sendMessage = (text) => {
    console.log("CD", currentUser.displayName)
    // const chatDocRef = doc(db, "chats", chatId.toString());

    // const messageInfo = {
    //   id: uuid(),
    //   text,
    //   text: currentUser.uid,
    //   date: Timestamp.now()
    // };

    // try {
    //   updateDoc(chatDocRef, {
    //     text: arrayUnion(messageInfo)
    //   });

    //   createLastMessage(text);
    // } catch (err) {
    //   throw err.message;
    // }
  }

  const deleteMessage = (text) => {
    const chatDocRef = doc(db, "chats", chatId);
    updateDoc(chatDocRef, {
      text: arrayRemove(text)
    });
  };

  return { sendMessage, deleteMessage };
}

export default useMessage;