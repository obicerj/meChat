import React from "react";
import Avatar from "../../components/Avatar";
import { HiOutlineChatBubbleLeftRight, HiOutlineUserGroup, HiOutlineUser } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarContent } from "../../reducers/sidebarContentReducer";
import { changeSidebarContent } from "../../reducers/sidebarContentReducer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Sidebar = () => {

  const MENU_LIST = [
    { name: "chats", content: "convos", icon: <HiOutlineChatBubbleLeftRight />, link: "chats" },
    { name: "search", content: "search", icon: <HiOutlineUserGroup />, link: "search" },
    { name: "profile", content: "profile", icon: <HiOutlineUser />, link: "profile" },
  ];

  const { content: sidebarContent } = useSelector(getSidebarContent);
  const dispatch = useDispatch();

  const sidebarBtnHandler = (content) => {
    content = content.replace(" ", "");
    dispatch(changeSidebarContent({ content }));
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
        <div className="flex flex-col gap-1">
          {MENU_LIST.map((menu) => {
            return (
              <button key={menu.name} 
              className="text-white text-3xl"
              onClick={() => sidebarBtnHandler(menu.content)}>
                {menu.icon}
              </button>
            )
          })}
        </div>
        <div className="absolute bottom-4 flex flex-col justify-center items-center">
          <button className="text-white text-2xl" 
          onClick={() => signOut(auth)}>
            <FiLogOut />
          </button>
        </div>
      </nav>

      {/* Nav container */}
    </>
  );
};

export default Sidebar;
