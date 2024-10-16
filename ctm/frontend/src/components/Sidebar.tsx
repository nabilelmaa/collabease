import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 flex flex-col">
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/tasks"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <Calendar className="w-5 h-5" />
                <span>Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/teams"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <Users className="w-5 h-5" />
                <span>Teams</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/reports"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FileText className="w-5 h-5" />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/notifications"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
