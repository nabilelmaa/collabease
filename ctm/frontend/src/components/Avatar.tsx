import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, Check, Settings, LogOut, HandCoins } from "lucide-react";
import { useTheme } from "../context/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdwon-menu";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface AvatarProps {
  src: string | null;
  alt: string;
  firstName: string;
  email: string;
  role: string;
  onSignOutClick?: () => void;
}

type ThemeOption = "light" | "dark" | "system";

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  firstName,
  email,
  role,
  onSignOutClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const onSettingsClick = () => {
    navigate("/settings");
  };

  const themeOptions: ThemeOption[] = ["light", "dark", "system"];

  const getIconColor = () => {
    return theme === "dark" ? "text-gray-300" : "text-gray-600";
  };

  const onBillingClick = () => {
    setIsMenuOpen(false);
    navigate("/billing");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-lg font-semibold">
            {getInitials(firstName)}
          </div>
        )}
      </button>

      <div
        className={`absolute right-0 mt-2 w-52 rounded-md shadow-lg z-50 bg-white dark:bg-zinc-800 transform transition-all duration-300 ease-out origin-top-right ${
          isMenuOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 border-b border-gray-200 text-center">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-10 h-10 rounded-full mb-2 mx-auto border border-gray-300"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-lg font-semibold mb-2 mx-auto">
              {getInitials(firstName)}
            </div>
          )}
          <p className="text-sm font-semibold dark:text-white text-gray-600">
            {firstName}
          </p>
          <p className="text-sm light:text-gray-500">{email}</p>
        </div>

        <div className="py-2">
          <button
            onClick={onSettingsClick}
            className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <Settings className={`w-5 h-5 ${getIconColor()}`} />
              <p className="ml-2 text-sm">Settings</p>
            </div>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  {theme === "dark" ? (
                    <Moon className={`w-5 h-5 ${getIconColor()}`} />
                  ) : (
                    <Sun className={`w-5 h-5 ${getIconColor()}`} />
                  )}
                  <p className="ml-2 text-sm">Appearance</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {themeOptions.map((themeOption) => (
                <DropdownMenuItem
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="capitalize">{themeOption}</span>
                    {theme === themeOption && (
                      <Check className={`h-4 w-4 ml-2 ${getIconColor()}`} />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={onBillingClick}
            className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HandCoins className={`w-5 h-5 ${getIconColor()}`} />
                <p className="ml-2 text-sm">Billing</p>
              </div>
              {role === "admin" ? (
                <Badge variant="secondary">PRO</Badge>
              ) : (
                <Badge variant="secondary">FREE</Badge>
              )}
            </div>
          </button>
          <button
            onClick={onSignOutClick}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <LogOut className={`w-5 h-5 text-red-500`} />
              <p className="ml-2 text-sm">Sign Out</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
