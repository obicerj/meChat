import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import Caster from "../../components/Caster";
import { getUserState } from "../auth/userSlice";
import { getConvoState } from "./convoSlice";
import MessageBubbleWrapper from "./MessageBubbleWrapper";
import WriteMessage from "./WriteMessage";

const Convo = () => {
  const { user: currentUser } = useSelector(getUserState);
  const { chatId, recipient } = useSelector(getConvoState);
  
  return (
    <section className="flex h-full w-full bg-slate-700">
      {/* if convo exists */}
      {chatId ? (
        <div className="w-full flex flex-col">
          {/* CONVO HEADER */}
          <header className="bg-slate-800 w-full px-4 pt-6 pb-4 mb-auto flex gap-2 items-center text-white">
            <Avatar
              imgURL={`https://picsum.photos/seed/${recipient?.displayName}/200/200`}
              className={""}
              size={"small"}
            />
            <p>{recipient?.displayName}</p>
          </header>

          {/* Message bubble */}
          <main className="relative flex flex-col overflow-y-scroll overflow-x-hidden px-4 py-2 gap-2 hide-scrollbar">
            <MessageBubbleWrapper user={currentUser} />
          </main>

          {/* Write message */}
          <WriteMessage />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <Caster
            heading={"No Chat Selected"}
            className={"font-medium text-gray-400"}
          />
        </div>
      )}
    </section>
  );
};

export default Convo;
