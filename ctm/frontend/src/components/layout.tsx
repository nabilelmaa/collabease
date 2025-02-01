import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar"; 
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow"> 
          <Outlet /> 
        </main>
      </div>
      <Footer /> 
    </>
  );
};

export default Layout;
