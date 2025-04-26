import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaGamepad, FaChartBar, FaBars, FaChevronLeft } from 'react-icons/fa'
import { MdOutlineSettings } from "react-icons/md";

interface SideBarProps {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}

const sections = [
  { link: "/dashboard/home", name: "Home", icon: <FaHome /> },
  { link: "/dashboard/games", name: "Games", icon: <FaGamepad /> },
  { link: "/dashboard/profile", name: "Profile", icon: <FaChartBar /> },
  { link: "/dashboard/settings", name: "Settings", icon: <MdOutlineSettings/>},
  // { link: "/more", name: "More", icon: <FaEllipsisH /> },
]

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
  const [openMobile, setOpenMobile] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed)
  const toggleMobile = () => setOpenMobile(!openMobile);

  const sidebarWidth = collapsed ? 'w-16' : 'w-1/6'

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button className="btn btn-square btn-sm" onClick={toggleMobile}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-base-100 shadow-sm transition-all duration-300 z-60 
          ${sidebarWidth} ${openMobile ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-5">
          {collapsed ? (
            <span className="font-pacifico text-2xl font-bold">M</span>
          ) : (
            <span className="font-pacifico text-2xl font-bold">Memora</span>
          )}
        </div>

        {/* Nav */}
        <ul className=''>
          {sections.map((item, index) => (
            <NavLink 
              key={index}
              to={item.link} 
              className={({ isActive }) =>
                `flex items-center gap-3 p-5 text-lg transition-all duration-200 hover:bg-base-200 ${
                  isActive ? 'border-l-4 border-green-500 bg-base-200' : ''
                }`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              {!collapsed && <span className="text-base">{item.name}</span>}
            </NavLink>
          ))}
        </ul>

        {/* Collapse Button (middle right) */}
        <div className="hidden md:block absolute top-9/10 -right-4 transform -translate-y-1/2">
          <button
            className="btn btn-sm btn-circle shadow-md bg-base-200 border"
            onClick={toggleCollapse}
          >
            <FaChevronLeft
              className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default SideBar
