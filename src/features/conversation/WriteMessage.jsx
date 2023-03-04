import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ConvoContext } from "../../context/ConvoContext";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

const WriteMessage = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ConvoContext);

  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      message: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now()
      })
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  }

  return (
    <div className="w-full flex items-center relative gap-2 px-2 py-1.5">
      <div className="bg-slate-900 relative w-full flex px-2 py-2 items-center gap-1 rounded-full">
        <div className="flex p-2 ml-0.5">
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>
        </div>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Write something"
          className="bg-transparent caret-white text-gray-100 px-2 py-2 w-full outline-none"
          />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 rounded-full relative ml-auto h-full flex items-center justify-center px-2.5 py-2.5 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WriteMessage;
