'use client'

import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps>  = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return ( 
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-70
                transition
                w-full
                ${outline ? 'bg-white dark:bg-black' : 'bg-black dark:bg-white'}
                ${outline ? 'border-black dark:border-white' : 'border-black dark:border-white'}
                ${outline ? 'text-black dark:text-white' : 'text-white dark:text-black'}
                ${small ? 'py-1' : 'py-3'}
                ${small ? 'text-sm' : 'text-md'}
                ${small ? 'font-light' : 'font-semibold'}
                ${small ? 'border-[1px]' : 'border-2'}
            `}
        >
            {Icon && (
                <Icon
                    size={24}
                    className='
                    absolute
                    left-4
                    top-3
                    '
                />
            )}
            {label}
        </button>
     );
}
 
export default Button;