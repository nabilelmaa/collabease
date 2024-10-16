import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { div } from "framer-motion/client";

interface JwtPayload {
  sub: string;
  firstName: string;
  lastName: string;
  picture: string;
  role: string;
  exp: number;
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token:", token);

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserInfo(decoded);

        window.history.replaceState({}, document.title, "/dashboard");
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const decoded = jwtDecode<JwtPayload>(savedToken);
          setUserInfo(decoded);
        } catch (error) {
          console.error("Failed to decode saved token:", error);
        }
      } else {
        console.log("No token found, redirecting to login...");
        window.location.href = "/auth/login";
      }
    }
  }, [location]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Dashboad</p>
    </div>
  );
};

export default Dashboard;
