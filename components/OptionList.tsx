import React from 'react';

interface OptionListProps {
  options: { id: number; name: string }[];
  selectedOptionId: string | null;
  onOptionClick: (optionId: string) => void;
}

const OptionList: React.FC<OptionListProps> = ({ options, selectedOptionId, onOptionClick }) => (
  <div className="w-full flex flex-col space-y-4"> 
    {options.map((option) => (
      <button
        key={option.id}
        onClick={() => onOptionClick(option.id.toString())}
        className={`w-full px-6 py-4 rounded-lg shadow-md text-left transition-colors duration-300 ${
          selectedOptionId === option.id.toString() ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {option.name}
      </button>
    ))}
  </div>
);

export default OptionList;
