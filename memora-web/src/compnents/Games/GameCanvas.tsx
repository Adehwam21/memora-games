export const GameCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gray-800 p-4 rounded-2xl shadow-2xl">
    <div className="relative w-[800px] h-[720px] bg-[#F9FAFB] border-[10px] rounded-xl overflow-hidden">
      {children}
    </div>
  </div>
);