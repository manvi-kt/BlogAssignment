import React from 'react';

interface SubOptionListProps {
  info: { id: string; name: string }[];
  selectedInfoId: string | null;
  onInfoClick: (infoId: string) => void;
}

const SubList: React.FC<SubOptionListProps> = ({ info, selectedInfoId, onInfoClick }) => (
  <div className="w-full flex flex-col space-y-4">
    {info.map((item) => (
      <button
        key={item.id}
        onClick={() => onInfoClick(item.id)}
        className={`w-full px-6 py-4 rounded-lg shadow-md text-left transition-colors duration-300 ${
          selectedInfoId === item.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {item.name}
      </button>
    ))}
  </div>
);

export default SubList;
