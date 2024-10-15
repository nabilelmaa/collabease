import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar"; // Import Sidebar if you have one
import { Outlet } from "react-router-dom"; // Import Outlet

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex"> {/* Flex container for sidebar and main content */}
        <Sidebar /> {/* Your sidebar component */}
        <main className="flex-grow"> {/* Main content area */}
          <Outlet /> {/* Renders the child route components */}
        </main>
      </div>
      <Footer /> {/* Optional footer */}
    </>
  );
};

export default Layout;
