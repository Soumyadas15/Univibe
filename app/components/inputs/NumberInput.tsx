import React from "react";
import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface NumberInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const numericRegex = /^[0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!numericRegex.test(inputChar)) {
      event.preventDefault();
    }
  };

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-400 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type="number"
        onKeyPress={handleKeyPress}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          text-neutral-800
          dark:text-neutral-300
          bg-white
          dark:bg-black
          border-2
          rounded-md
          outline-none
          transition
          number-input
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-[#ff297f]" : "border-neutral-500 dark:border-neutral-800"}
          ${errors[id] ? "focus:border-[#ff297f]" : "focus:border-neutral-500"}
        `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-90
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-[#ff297f]" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default NumberInput;
