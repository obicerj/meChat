import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConvoContext } from "../../context/ConvoContext";
import { db } from "../../firebase";
import { getConvoState } from "./convoSlice";
import MessageBubble from "./MessageBubble";

const MessageBubbleWrapper = ({user}) => {
  const [messages, setMessages] = useState([]);
  // const {data} = useContext(ConvoContext);
  const { chatId } = useSelector(getConvoState);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), async (doc) => {
      doc.exists() && setMessages(Object.entries(doc.data().message));
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div>
      {messages?.map((m, index) => (
        <MessageBubble message={m[1]} user={user} key={index}/>
      ))}
    </div>
  );
};

export default MessageBubbleWrapper;
