import React from "react";

import { motion } from "framer-motion";

type ThemeButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};
export default function ThemeButton({ onClick, isOpen }: ThemeButtonProps) {
  return (
    <button
      className="theme-button"
      onClick={onClick}
    >
      theme <ChevronSVG isOpen={isOpen} />
    </button>
  );
}

type ChevronSVGProps = {
  isOpen: boolean;
};
const ChevronSVG = ({ isOpen }: ChevronSVGProps) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 180 : 0 }}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.96876 3.9082H5.37293H3.03543C2.63543 3.9082 2.43543 4.39154 2.71876 4.67487L4.87709 6.8332C5.22293 7.17904 5.78543 7.17904 6.13126 6.8332L6.95209 6.01237L8.28959 4.67487C8.56876 4.39154 8.36876 3.9082 7.96876 3.9082Z"
          fill="#9A9A9A"
        />
      </svg>
    </motion.div>
  );
};
