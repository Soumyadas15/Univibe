'use client'

import React from 'react';
import Select from 'react-select';
import useDarkMode from '@/app/hooks/useDarkMode';
import collegesData from '@/public/assets/colleges.json'
import { 
    FieldErrors,
    UseFormRegister,
    FieldValues
} from "react-hook-form";

export type CollegeSelectValues = {
    label?: string;
    region?: string;
    value: string;
    
}

interface College {
    name: string;
    location: string;
}

interface CollegeSelectProps {
    value?: CollegeSelectValues;
    onChange: (value: CollegeSelectValues)  => void;
    register: UseFormRegister<FieldValues>,
}

const CollegeSelect: React.FC<CollegeSelectProps> = ({
    value,
    onChange,
    register,
    
}) => {
    const isDarkMode = useDarkMode();
    const colleges = collegesData.colleges;
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            background: isDarkMode ? '#000000' : '#FFFFFF',
            color: 'white',
            border: state.isFocused ? '2px solid #afafaf' : '2px solid #afafaf',
            boxShadow: 'none',
            '&:hover': {
                border: state.isFocused ? '2px solid #3182ce' : '2px solid #718096',
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            background: isDarkMode ? '#6B6B6B' : '#E5E5E5',
            boxShadow: 'none',
        }),
    };

    return (  
        <div>
            <Select
                styles={customStyles}
                className='border-0'
                placeholder="Anywhere"
                isClearable
                options={colleges.map(college => ({
                    label: college.name,
                    value: college.name,
                    region: college.city,
                }))}
                
                value={value}
                onChange={(selectedOption) => onChange(selectedOption as CollegeSelectValues)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        
                        <div>
                            <span className="dark:text-neutral-200 text-black ml-1">
                                {option.label}
                            </span>
                            
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: '#232323',
                        primary25: '#5E5E5E'
                    }
                })}
            />
        </div>
    );
}

export default CollegeSelect;
