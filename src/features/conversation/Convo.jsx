import React from "react";
import Avatar from "../../components/Avatar";
import Caster from "../../components/Caster";
import MessageBubble from "./MessageBubble";
import WriteMessage from "./WriteMessage";

const Convo = () => {
  return (
    <section className="flex h-full w-full bg-slate-700">
      {/* if convo exists */}
      <div className="w-full flex flex-col">
          {/* CONVO HEADER */}
          <header className="bg-slate-800 w-full px-4 pt-6 pb-4 mb-auto flex gap-2 items-center text-white">
            <Avatar 
              imgURL={'https://via.placeholder.com/150'}
              className={''}
              size={'small'}
            />
            <p>Username</p>
          </header>
          
          {/* Message bubble */}
          <main className="relative flex flex-col overflow-y-scroll overflow-x-hidden px-2 py-2 gap-2 hide-scrollbar">
            <MessageBubble />
          </main>
          
          {/* Write message */}
          <WriteMessage />
      </div>

      {/* if empty */}
      {/* <div className="w-full flex flex-col justify-center items-center">
        <Caster 
          heading={'No Chat Selected'}
          className={'font-medium text-gray-400'}
        />
      </div> */}
    </section>
  );
};

export default Convo;
