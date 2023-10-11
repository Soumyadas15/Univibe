'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
  start: number;
  end: number;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  disabled,
  onChange,
  start,
  end,
}) => {

    const onAdd = useCallback(() => {
        if (!disabled && value < end) {
          onChange(value + 1);
        }
      }, [onChange, value, disabled]);
    
      const onReduce = useCallback(() => {
        if (!disabled && value > start) {
          onChange(value - 1);
        }
      }, [onChange, value, disabled]);

  return ( 
    <div className={`
            flex 
            flex-row 
            items-center 
            justify-between
            select-none
            ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        `}
    >
      <div className="flex flex-col gap-2">
        <div className="font-semibold">
            {title}
        </div>
        <div className="font-light text-[#181818] dark:text-[#d6d6d6]">
            {subtitle}
        </div>
      </div>
      <div className={`
              flex 
              flex-row 
              items-center 
              gap-4
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        `} >
        <div
          onClick={onReduce}
          className={`
            w-10
            h-10
            rounded-full
            border-[2px]
            border-[#ff297f]
            flex
            items-center
            justify-center
            text-[#ff297f]
            transition
            ${disabled ? "cursor-not-allowed" : ""}
            ${value <= start ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:opacity-80"}
            
          `}
        >
          <AiOutlineMinus />
        </div>
        <div 
          className="
            font-light 
            text-xl
             
          "
        >
            {value}
          </div>
        <div
          onClick={onAdd}
          className={`
            w-10
            h-10
            rounded-full
            border-[2px]
            border-[#ff297f]
            flex
            items-center
            justify-center
            text-[#ff297f]
            transition
            ${disabled ? "cursor-not-allowed" : ""}
            ${value >= end ? "cursor-not-allowed opacity-40" : "hover:opacity-80 cursor-pointer"}
          `}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
   );
}
 
export default Counter;
