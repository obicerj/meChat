import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ConvoContext } from "../../context/ConvoContext";
import { db } from "../../firebase";
import MessageBubble from "./MessageBubble";

const MessageBubbleWrapper = ({user}) => {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ConvoContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), async (doc) => {
      doc.exists() && setMessages(Object.entries(doc.data().message));
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div>
      {messages?.map((m, index) => (
        <MessageBubble message={m[1]} user={user} key={index}/>
      ))}
    </div>
  );
};

export default MessageBubbleWrapper;
