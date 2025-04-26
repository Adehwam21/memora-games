import React from 'react'
import UserHandle from './UserHandle'

const Header: React.FC = () => {
  return (
    <div className="flex justify-between h-18 py-0 px-6 bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
      <span className="font-pacifico text-2xl font-bold"></span>
      <UserHandle/>
    </div>
  )
}

export default Header