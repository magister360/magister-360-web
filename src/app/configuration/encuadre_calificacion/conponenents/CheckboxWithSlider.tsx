import React, { useEffect, useState } from "react";

interface CheckboxWithSliderProps {
  label: string;
  onValueChange: (isChecked: boolean, value: number) => void;
  initialChecked?: boolean;
  initialValue?: number;
}

const CheckboxWithSlider: React.FC<CheckboxWithSliderProps> = ({
  label,
  onValueChange,
  initialChecked = false,
  initialValue = 0,
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setIsChecked(initialChecked);
    setSliderValue(initialValue);
    setInputValue(initialValue);
  }, [initialChecked, initialValue]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onValueChange(checked, sliderValue);

  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSliderValue(value);
    setInputValue(value);
    if (isChecked) {
      onValueChange(isChecked, value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInputValue(value);
    setSliderValue(value);
    if (isChecked) {
      onValueChange(isChecked, value);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="flex items-center space-x-4 sm:max-w-full">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={`toggle-${label}`}
            className="sr-only peer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div
            className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4
           peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
            dark:bg-gray-700 peer-checked:after:translate-x-full
             peer-checked:after:border-white after:content-[''] 
             after:absolute after:top-[2px] after:left-[2px] after:bg-white 
             after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 
             after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
        <div className="relative mb-6 flex-grow">
          <input
            type="range"
            value={sliderValue}
            min="0"
            max="100"
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 custom-range"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 
              ${sliderValue}%, #e5e7eb ${sliderValue}%, #e5e7eb 100%)`,
            }}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
            Min (0)
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
            25
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
            50
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
            75
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
            Max (100)
          </span>
        </div>
        <input
          type="number"
          min="0"
          max="100"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 dark:bg-[#1a2c32]"
        />
      </div>
    </div>
  );
};

export default CheckboxWithSlider;
