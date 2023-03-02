import React from "react";
import Avatar from "../../components/Avatar";

const Sidebar = () => {

  const MENU_LIST = [
    { name: "chats", icon: "", link: "chats" },
    { name: "search", icon: "", link: "search" },
    { name: "profile", icon: "", link: "profile" },
  ]
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
              <button className="text-white">
                {menu.name}
              </button>
            )
          })}
        </div>
        <div className="absolute bottom-4">
          <button className="text-white">
            Log out
          </button>
        </div>
      </nav>

      {/* Nav container */}
    </>
  );
};

export default Sidebar;
