import React from "react";
import { ConvoContainer } from "../inbox";
import Profile from "../profile/Profile";
import SearchPeople from "../search/SearchPeople";
import { useSelector } from "react-redux";
import { getSidebarContent } from "./sidebarContentSlice";

const sidebarContent = () => {

  const { content: sidebarContent } = useSelector(getSidebarContent)

  return (
    <aside className="
    relative 
    bg-slate-900 
    border-slate-900
    border-r border-main 
    w-full h-full md:w-32 md:min-w-[24rem] overflow-x-hidden
    overflow-y-scroll hide-scrollbar">
      {/* List of convos / Messages */}
      {sidebarContent  === "convos" && (
        <ConvoContainer />
      )}
      
      {/* Search */}
      {sidebarContent === "search" && (
        <SearchPeople />
      )}

      {/* Profile */}
      {sidebarContent === "profile" && (
        <Profile />
      )}
    </aside>
  );
};

export default sidebarContent;
