import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  selectedValue: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
      >
        <span className="text-sm">{selectedValue.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-36 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
