import React, { useContext } from "react";
import { Convo } from "../features/conversation";
import { Sidebar, SidebarContent } from "../features/sidebar";

const Home = () => {
 
  return (
    <div className="absolute inset-0 flex flex-col-reverse md:flex-row w-screen overflow-hidden">
      <Sidebar />
      <SidebarContent />

        <Convo />
      
    </div>
  );
};

export default Home;
