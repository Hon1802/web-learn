import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

interface LayoutProps {
   children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
   return (
      <div>
         <Navbar />
         <div style={{}}>
            <Outlet />
            <Footer />
         </div>
      </div>
   );
};

export default Layout;
