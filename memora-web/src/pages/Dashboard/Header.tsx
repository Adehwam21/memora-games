import React from 'react'
import UserHandle from './UserHandle'

interface HeaderProps {
  collapsed: boolean,
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({collapsed, toggleSidebar }) => {
  return (
    <div className="flex flex-row justify-between items-center h-19 py-0 bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="p-3 md:p-5 text-green-700 flex items-center hover:cursor-pointer">
        {/* Mobile: Logo as button */}
        <button onClick={toggleSidebar} className="md:hidden hover:bg-gray-100 p-2 ">
          <img className='w-7 h-7 hover:cursor-pointer' src="/images/mgt.png" alt="Memora games logo" />
        </button>

        {/* Desktop: normal logo */}
        <span className="hidden font-poppins text-md font-bold hover:cursor-pointer md:flex justify-center items-center gap-2">
          <img className='w-7 h-7' src="/images/mgt.png" alt="Memora games logo" />
          {!collapsed && <span>Memora Games</span>}
        </span>

      </div>

      <UserHandle />
    </div>
  )
}

export default Header
