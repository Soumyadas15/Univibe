'use client';

import { IconType } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    const containerClasses: ClassValue = twMerge(
        'rounded-xl',
        'border-2',
        'p-4',
        'flex',
        'flex-col',
        'gap-3',
        'group',
        'transition',
        'cursor-pointer',
        'no-scrollbar',
        selected ? 'border-[#ff297f]' : 'dark:border-neutral-800 border-neutral-400'
    );

    const iconClasses: ClassValue = twMerge(
        'text-neutral-500',
        'group-hover:text-[#ff297f]',
        selected ? 'text-[#ff297f]' : ''
    );

    const labelClasses: ClassValue = twMerge(
        'font-semibold',
        'group-hover:text-[#ff297f]',
        selected ? 'text-[#ff297f]' : 'text-neutral-500'
    );

    return (  
        <div
            onClick={() => onClick(label)}
            className={clsx(containerClasses)}
        >
            <div className={clsx(iconClasses)}>
                <Icon size={30} />
            </div>
            <div className={clsx(labelClasses)}>
                {label}
            </div>
        </div>
    );
}
 
export default CategoryInput;
