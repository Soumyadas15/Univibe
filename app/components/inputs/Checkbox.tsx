'use client';

import { useCallback, useState } from "react";

interface CheckboxProps {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  title,
  value,
  onChange,
}) => {
  
    const [isChecked, setIsChecked] = useState(value);

    const handleCheckboxChange = useCallback(() => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange(newValue);
    }, [isChecked, onChange]);
  
    return (
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-row items-center gap-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="
                h-8
                w-8
                rounded-full
                text-[#ff297f] 
                bg-transparent
                border-[#ff297f]
                transition
                without-ring
                cursor-pointer
            "
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{title}</div>
        </div>
      </div>
    );
  };
  
  export default Checkbox;
