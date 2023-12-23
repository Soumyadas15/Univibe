// CollegeDepartmentSelect.tsx
"use client"

import React from 'react';
import Select from 'react-select';
import collegesData from '@/public/assets/colleges.json';
import useDarkMode from '@/app/hooks/useDarkMode';

interface CollegeDepartmentSelectProps {
  collegeName: string;
  value?: string;
  onChange: (value: string) => void;
}

const CollegeDepartmentSelect: React.FC<CollegeDepartmentSelectProps> = ({
  collegeName,
  value,
  onChange,
}) => {
    const isDarkMode = useDarkMode();
  const college = collegesData.colleges.find((c) => c.name === collegeName);

  if (!college) {
    return null; 
  }
  
  const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        background: isDarkMode ? '#000000' : '#FFFFFF',
        color: 'white',
        border: state.isFocused ? '2px solid #ff297f' : '2px solid #262626',
        boxShadow: 'none',
        '&:hover': {
            border: state.isFocused ? '2px solid #ff297f' : '2px solid #262626',
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
        placeholder='Department'
        isClearable
        options={college.departments.map((department) => ({
          label: department,
          value: department,
        }))}
        value={value ? { label: value, value } : null}
        onChange={(selectedOption) =>
          onChange(selectedOption ? (selectedOption as any).value : '')
        }
        formatOptionLabel={(option) => (
          <div className='flex flex-row items-center gap-3 z-40'>
            <div>
              <span className='dark:text-neutral-200 text-black ml-1'>
                {option.label}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          
        })}
      />
    </div>
  );
};

export default CollegeDepartmentSelect;
