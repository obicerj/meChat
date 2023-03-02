import React from "react";
import { ConvoContainer } from "../inbox";
import Profile from "../profile/Profile";
import SearchPeople from "../search/SearchPeople";

const sidebarContent = () => {
  return (
    <aside className="
    relative 
    bg-slate-900 
    border-slate-900
    border-r border-main 
    w-full h-full md:w-32 md:min-w-[24rem] overflow-x-hidden">
      {/* List of convos / Messages */}
      <ConvoContainer />

      {/* Search */}
      {/* <SearchPeople /> */}

      {/* Profile */}
      {/* <Profile /> */}
    </aside>
  );
};

export default sidebarContent;
