import React from 'react'
import UserHandle from './UserHandle'

interface HeaderProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center h-19 py-0 bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="p-5 text-green-700 flex items-center hover:cursor-pointer">
        {/* Mobile: Logo as button */}
        <button onClick={toggleSidebar} className="md:hidden">
          <span className="font-pacifico text-2xl font-bold">Mg</span>
        </button>

        {/* Desktop: normal logo */}
        <span className="hidden md:inline font-poppins text-3xl font-bold hover:cursor-pointer">
          {collapsed ? "Mg" : "Mg"}
        </span>
      </div>

      <UserHandle />
    </div>
  )
}

export default Header
