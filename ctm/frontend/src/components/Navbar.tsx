import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { jwtDecode } from "jwt-decode";

interface NavLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

interface User {
  sub: string;
  firstName: string;
  lastName: string;
  role: string;
  picture: string;
  exp: number;
}

interface User {
  role: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, onClick }) => (
  <a
    onClick={onClick}
    className="cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </a>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ children, onClick }) => (
  <a
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    {children}
  </a>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/auth/login";
  const isRegisterPage = location.pathname === "/auth/register";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    const userTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (userTheme) {
      setTheme(userTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAppearanceChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const handleAvatarClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    setUserInfo(null);
  };

  if (isLoginPage || isRegisterPage) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <a href="/">
              <img src="/logo.svg" alt="logo" width={30} />
            </a>
          </div>
          <div className="hidden sm:ml-6 sm:flex space-x-4 justify-center">
            {isHomePage && (
              <>
                <NavLink onClick={() => scrollToSection("about")}>
                  About Us
                </NavLink>
                <NavLink onClick={() => scrollToSection("features")}>
                  Features
                </NavLink>
                <NavLink onClick={() => scrollToSection("reviews")}>
                  Reviews
                </NavLink>
                <NavLink onClick={() => scrollToSection("pricing")}>
                  Pricing
                </NavLink>
              </>
            )}
          </div>
          <div className="hidden sm:flex items-center">
            {!userInfo ? (
              <a
                href="/auth/login"
                className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-secondaryColor transition duration-300"
              >
                Sign In
              </a>
            ) : (
              <div className="relative">
                <Avatar
                  src={userInfo.picture}
                  alt="User Avatar"
                  firstName={userInfo.firstName}
                  email={userInfo.sub}
                  role={userInfo.role}
                  onSignOutClick={handleLogout}
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink
              onClick={() => {
                scrollToSection("features");
                setIsOpen(false);
              }}
            >
              Features
            </MobileNavLink>
            <MobileNavLink
              onClick={() => {
                scrollToSection("about");
                setIsOpen(false);
              }}
            >
              About Us
            </MobileNavLink>
            <MobileNavLink
              onClick={() => {
                scrollToSection("contact");
                setIsOpen(false);
              }}
            >
              Contact Us
            </MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <a
              href="/auth/login"
              className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Log In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
