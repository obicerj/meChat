import React from "react";
import Avatar from "../../components/Avatar";

const ConvoList = () => {
  return (
    <>
      <div className="flex flex-col sticky top-0 bg-slate-900">
        {/* HEADER */}
        <header className="flex flex-row justify-between px-2 py-2 mt-2">
          <h2 className="text-2xl text-gray-300 mx-2">Chats</h2>
        </header>
      </div>
      <main>
        <ul className="flex flex-col gap-2 mt-2 mx-2">
          <li
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:cursor-pointer 
            hover:bg-gray-700/50"
          >
            <div>
              <Avatar imgURL={"https://via.placeholder.com/150"} />
            </div>
            <div>
              <h2 className="text-md text-gray-100">Name</h2>
              {/* LAST MESSAGE */}
              <p className="text-xs text-gray-400">
                Last message text <span>•</span>{" "}
                <time className="w-fit">Date</time>
              </p>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
};

export default ConvoList;
