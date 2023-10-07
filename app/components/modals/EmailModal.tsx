"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln7mb1dg.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useEmailModal from "@/app/hooks/useEmailModal";
import { useCallback, useState } from "react";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import toast from "react-hot-toast";
import { Verified } from "lucide-react";


const EmailModal = () => {
    const emailModal = useEmailModal();
    const confettiStore = useConfettiStore();
    const welcomeModal = useWelcomeModal();
    const successModal = useSuccessModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          activationCode: ''
        },
    
      });

    const handleClose = useCallback(() => {
        emailModal.onClose();
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        
          setIsLoading(true);
          
          axios.post('/api/email', data)
          .then(() => {
            emailModal.onClose();
            welcomeModal.onOpen();
            toast.success('Email verified');
          })
          .catch((error) => {
            const errorMessage = error.response ? error.response.data.error : 'Network Error';
            toast.error(errorMessage);
            console.log(error)
          })
          .finally(() => {
            setIsLoading(false);
          })
        
      }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Verify your email'
                // subtitle= 'You have successfully signed up'
                center
            />
            <div className="flex items-center justify-center">
                <Lottie animationData={animationData} className="h-[150px] w-[150px]"/>
            </div>
            <Input
                id="activationCode"
                label="Enter 6-digit verification code"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {emailModal.isOpen}
                title= "You're almost there"
                actionLabel='Submit'
                onClose={handleClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
            />
        </div>
     );
}
 
export default EmailModal;