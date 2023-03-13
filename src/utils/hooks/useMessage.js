import { useSelector } from "react-redux"
import { getUserState } from "../../features/auth/userSlice"
import { getConvoState } from "../../features/conversation/convoSlice";
import { 
  arrayRemove, 
  arrayUnion, 
  doc, 
  Timestamp,
  serverTimestamp,
  updateDoc 
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

const useMessage = () => {
  const { chatId, recipient } = useSelector(getConvoState);
  const { user: currentUser } = useSelector(getUserState);

  const createLastMessage = async (text) => {
    try {
        await updateDoc(doc(db, "chats", chatId), {
          message: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
          })
        });
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", recipient.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });


      } catch (err) {
        throw err.message;
    }
  };

  const sendMessage = (text) => {
    const chatDocRef = doc(db, "chats", chatId.toString());

    const messageInfo = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now()
    };

    try {
      updateDoc(chatDocRef, {
        text: arrayUnion(messageInfo)
      });

      createLastMessage(text);
    } catch (err) {
      throw err.message;
    }
  }

  const deleteMessage = (text) => {
    const chatDocRef = doc(db, "chats", chatId.toString());
    updateDoc(chatDocRef, {
      message: arrayRemove(text)
    });
  };

  return { sendMessage, deleteMessage };
}

export default useMessage;