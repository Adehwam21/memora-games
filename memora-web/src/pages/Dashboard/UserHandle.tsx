import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { resetApp } from "../../redux/resetApp";

const UserHandle: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username } = useSelector((state: RootState) => state.auth!.user!);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(resetApp());
    persistor.purge()
    navigate("/")

    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center pr-5 rounded-lg " ref={menuRef}>
      {/* User Button */}
      <button
        className="flex text-green-700 items-center gap-2 p-3 transition hover:bg-base-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LuUserRound size={23} />
        <span className="hidden md:inline text-xl font-pacifico">{username}</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-16 mt-2 min-w-[15rem] bg-white rounded-lg shadow-lg z-50"
          >
            <ul className="py-2">
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <MdOutlineSettings /> Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-red-100 text-red-600 transition"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserHandle;
