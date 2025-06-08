import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <div
        className="fixed top-5 left-5 z-50 bg-white p-2 rounded shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
            <FontAwesomeIcon icon={faBars} size="lg" />
      </div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full min-w-80 bg-white text-purple-800 p-6 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex m-10 items-center gap-2 text-lg font-semibold mb-6">
          <FontAwesomeIcon icon={faListCheck} />
          <span>My Tasks</span>
        </div>

        {/* Task Categories */}
        <ul className="space-y-4 flex-1">
            <li className="hover:text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-purple-500 via-purple-400 to-blue-500  cursor-pointer">Work</li>
            <li className="hover:text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-purple-500 via-purple-400 to-blue-500  cursor-pointer">Personal</li>
            <li className="hover:text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-purple-500 via-purple-400 to-blue-500  cursor-pointer">Groceries</li>
            <li className="hover:text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-purple-500 via-purple-400 to-blue-500  cursor-pointer">Ideas</li>
        </ul>

        {/* Add Task Button */}
        <button className="mt-6 w-full bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 cursor-pointer text-white py-2 px-4 rounded flex items-center justify-center gap-2 font-semibold">
          <FontAwesomeIcon icon={faPlus} />
          Add Task
        </button>
      </div>
    </>
  );
}

export default Sidebar;
