import React from "react";
import Avatar from "../../components/Avatar";
import { RiContactsLine, RiUserSmileLine, RiMessage3Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarContent } from "./sidebarContentSlice";
import { logout } from "../auth";
import { resetConvo } from "../conversation/convoSlice";

const Sidebar = () => {

  const MENU_LIST = [
    { name: "chats", content: "convos", icon: <RiMessage3Line />, link: "chats" },
    { name: "search", content: "search", icon: <RiContactsLine />, link: "search" },
    { name: "profile", content: "profile", icon: <RiUserSmileLine />, link: "profile" },
  ];

  const dispatch = useDispatch();

  const sidebarBtnHandler = (content) => {
    content = content.replace(" ", "");
    dispatch(changeSidebarContent({ content }));
  }

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(resetConvo());
  }

  return (
    <>
      <nav className="relative hidden px-4 pt-4 pb-2 w-fit bg-slate-800 md:flex md:flex-col gap-4">
        {/* USER AVATAR */}
        <button
          onClick={() => sidebarBtnHandler("profile")}
          className="text relative group flex justify-center"
        >
          <Avatar
            isOnline={false}
            imgURL={"https://picsum.photos/200"}
            size="small"
            className=""
          />
        </button>

        {/* NAV MENU */}
        <div className="flex flex-col gap-8 mt-6">
          {MENU_LIST.map((menu) => {
            return (
              <button key={menu.name} 
              className="text-blue-400 text-2xl"
              onClick={() => sidebarBtnHandler(menu.content)}>
                {menu.icon}
              </button>
            )
          })}
        </div>
        <div className="absolute bottom-4 flex flex-col justify-center items-center">
          <button className="text-red-600 text-2xl" 
          onClick={ handleSignOut }>
            <FiLogOut />
          </button>
        </div>
      </nav>

    </>
  );
};

export default Sidebar;
