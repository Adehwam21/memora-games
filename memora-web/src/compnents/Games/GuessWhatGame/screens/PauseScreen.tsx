import React, { useEffect, useRef } from 'react';
import {
  FiPlay,
  FiRotateCcw,
} from 'react-icons/fi';

interface PauseScreenProps {
  onResume: () => void;
  onRestart: () => void;
}

const PauseScreen: React.FC<PauseScreenProps> = ({
  onResume,
  onRestart,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside the modal
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onResume();
    }
  };

  // Handle Escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onResume();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="absolute top-15 left-0 inset-0 z-50 bg-black/40 backdrop-blur-2xl flex items-center justify-center">
      <div
        ref={modalRef}
        className="text-gray-800 w-[90%] max-w-md p-6 text-center space-y-5 animate-fadeIn"
      >
        <h2 className="text-3xl text-[#EADEB8] font-extrabold ">Game Paused</h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={onResume}
            className="flex items-center justify-center gap-2 bg-black/70 hover:bg-black/40 text-[#EADEB8] p-5 transition-transform duration-200 hover:scale-105"
          >
            <FiPlay size={20} /> Resume
          </button>

          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-black/70 hover:bg-black/40 text-[#EADEB8] p-5 transition-transform duration-200 hover:scale-105"
          >
            <FiRotateCcw size={20} /> Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseScreen;
