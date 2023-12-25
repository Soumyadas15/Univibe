'use client';

import { IconType } from 'react-icons';
import animationData from '../../public/assets/ButtonLoader.json';
import blackLoader from '../../public/assets/LoadingBlack.json';
import Lottie from 'lottie-react';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  dontShowLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  dontShowLoading = false,
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
                h-[3.5rem]
                flex
                items-center
                justify-center
                ${outline ? '' : 'bg-black dark:bg-white'}
                ${outline ? 'border-black dark:border-white' : 'border-black dark:border-white'}
                ${outline ? 'text-black dark:text-white' : 'text-white dark:text-black'}
                ${small ? 'py-1' : 'py-0'}
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

      <div className='h-full w-full flex items-center justify-center'>
        <div className='h-[75%] w-[95%] items-center justify-center flex'>
          {disabled ? (
            <div>
              {!dontShowLoading ? (
                <>
                  <div className='block dark:hidden'>
                    <div className='flex items-center justify-center w-[2rem]'>
                      <Lottie animationData={animationData} />
                    </div>
                  </div>
                  <div className='hidden dark:block'>
                    <div className='flex items-center justify-center w-[8rem]'>
                      <Lottie animationData={blackLoader} />
                    </div>
                  </div>
                </>
              ) : (
                <div>{label}</div>
              )}
            </div>
          ) : (
            <div>{label}</div>
          )}
        </div>
      </div>
    </button>
  );
};

export default Button;
