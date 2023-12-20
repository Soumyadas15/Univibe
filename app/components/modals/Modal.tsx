'use client'

import { useCallback, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../Button';
import Lottie from 'lottie-react';

interface ModalProps {
    isOpen? : boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    noHide?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    noHide,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
        return;
        }
    
        setShowModal(false);
        setTimeout(() => {
        onClose();
        }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
        return;
        }
        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
        return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (  
        <>
            <div
                className='
                   justify-center
                   items-center
                   flex
                   overflow-x-hidden
                   overflow-y-auto
                   fixed
                   inset-0
                   z-[2100]
                   outline-none
                   focus:outline-none
                   bg-neutral-800/70
                '
            >
                <div
                    className='
                        relative
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                    '
                >
                  {/* content */}
                  <div
                    className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}
                  >
                    <div
                        className='
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0
                            rounded-lg
                            shadow-lg
                            relative
                            flex
                            flex-col
                            w-full
                            bg-white
                            dark:bg-black
                            outline-none
                            focus:outline-none
                        '
                    >
                        {/* Header */}
                        <div
                            className='
                                flex
                                items-center
                                p-6
                                rounded-t
                                justify-center
                                relative
                            '
                        >
                            <button
                                onClick={handleClose}
                                className='
                                    p-6
                                    border-0
                                    hover:opacity-70
                                    transition
                                    absolute
                                    left-0
                                '
                            >
                                <div className='text-black dark:text-white'><X size={18}/></div>
                            </button>
                            <div className='text-lg text-black dark:text-white font-semibold'>
                                {title}
                            </div>
                        </div>
                        {/* Body */}
                        <div className={`
                                relative 
                                p-6 
                                flex-auto 
                                ${noHide ? '' : 'overflow-hidden'}
                        `}>
                            <div className='object-cover'>
                                {body}
                            </div>
                            
                        </div>
                        {/* Footer */}
                        <div className='flex flex-col gap-2 p-6'>
                            <div
                                className='
                                    flex
                                    flex-row
                                    items-center
                                    gap-4
                                    w-full
                                '
                            > 
                            {secondaryAction && secondaryActionLabel && (
                                <Button
                                    outline
                                    disabled = {disabled}
                                    label = {secondaryActionLabel}
                                    onClick={handleSecondaryAction}
                                    
                                />
                                )}
                                {actionLabel ? (
                                    <Button     
                                        disabled = {disabled}
                                        label = {actionLabel}
                                        onClick={handleSubmit}
                                    />
                                ) : (
                                    <div>

                                    </div>
                                )}
                                
                            </div>
                            {footer}
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </>
    );
}
 
export default Modal;