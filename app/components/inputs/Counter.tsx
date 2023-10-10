'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  disabled,
  onChange,
}) => {

    const onAdd = useCallback(() => {
        if (!disabled && value < 5) {
          onChange(value + 1);
        }
      }, [onChange, value, disabled]);
    
      const onReduce = useCallback(() => {
        if (!disabled && value > 1) {
          onChange(value - 1);
        }
      }, [onChange, value, disabled]);

  return ( 
    <div className={`
            flex 
            flex-row 
            items-center 
            justify-between
            ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        `}
    >
      <div className="flex flex-col">
        <div className="font-semibold">
            {title}
        </div>
        <div className="font-light">
            {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
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
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            hover:opacity-80
            transition
            ${value <= 1 ? "cursor-not-allowed opacity-40 hover:opacity-40" : ""}
            
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
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            hover:opacity-80
            transition
            ${value >= 5 ? "cursor-not-allowed opacity-40 hover:opacity-40" : ""}
          `}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
   );
}
 
export default Counter;
