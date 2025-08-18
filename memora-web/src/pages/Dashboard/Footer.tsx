import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3 px-4 mt-20 text-xs text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left */}
        <div className="font-semibold text-gray-700">Memora Games</div>

        {/* Center */}
        <div className="text-center">© {new Date().getFullYear()} All rights reserved</div>

        {/* Right */}
        <div className="text-right">
          <a
            href="https://github.com/Adehwam21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            GitHub: @Adehwam21
          </a>
        </div>
      </div>
    </footer>
  );
};
