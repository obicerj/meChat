import React from "react";
import Caster from "../components/Caster";
import { Convo } from "../features/conversation";
import { Sidebar, SidebarContent } from "../features/sidebar";

const Home = () => {
  return (
    <div className="absolute inset-0 flex flex-col-reverse md:flex-row w-screen overflow-hidden">
      <Sidebar />
      <SidebarContent />

      {/* isAuth */}
      {/* show Chatbox */}
      <Convo />
      {/* else */}
      {/* show empty chatbox is message */}
      {/* <Caster 
      heading="Start Chat"
      message="Think of convo starter and start chatting"
      className="text-center"
      /> */}
    </div>
  );
};

export default Home;
