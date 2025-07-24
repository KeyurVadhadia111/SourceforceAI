import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

interface MultiSelectDropdownProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedOptions,
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchTerm(""); // Clear search when opening/closing
  };

  const handleOptionClick = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(newSelectedOptions);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="inline-flex items-center justify-center gap-2.5 px-3 py-2 relative flex-[0_0_auto] bg-white rounded-[100px] border border-solid border-[#eeeeee] cursor-pointer"
        onClick={handleToggle}
      >
        <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-[8px] sm:text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
          {selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder}
        </div>
        <Icon icon="chevron-down" className="w-3 h-3 sm:w-5 sm:h-5 text-text dark:text-textDark" />

      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-solid border-[#eeeeee] rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full p-2 border border-solid border-[#eeeeee] rounded-md text-xs focus:outline-none focus:border-[#529e7e]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100 text-xs"
                onClick={() => handleOptionClick(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  readOnly
                  className="mr-2"
                />
                {option}
              </div>
            ))
          ) : (
            <div className="p-2 text-xs text-gray-500">No options found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;