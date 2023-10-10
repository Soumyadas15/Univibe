'use client';

import axios from "axios";

import { useCallback, useState } from "react";

import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";


import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CollegeSelect, { CollegeSelectValues } from "../inputs/CollegeSelect";
import useEmailModal from "@/app/hooks/useEmailModal";
import { sendMail } from "@/app/utils/mailSender";


const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const welcomeModal = useWelcomeModal();
  const loginModal = useLoginModal();
  const emailModal = useEmailModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<CollegeSelectValues | undefined>(undefined);
  

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      institute: '',
      email: '',
      password: '',
      name: '',
    },

  });

  const handleClick = () => {
    registerModal.onClose();
    welcomeModal.onOpen();
  }

  const toggleForm = () => {
    registerModal.onClose();
    loginModal.onOpen();
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    if (selectedCollege) {
      data.institute = selectedCollege.value;
    }
    
    setIsLoading(true);
    
    axios.post('/api/register', data)
    .then(() => {
      registerModal.onClose();
      emailModal.onOpen();
    })
    .catch((error) => {
    
    console.log(error)
    })
    .finally(() => {
      setIsLoading(false);
    })
    
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Univibe"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CollegeSelect
          value={selectedCollege}
          onChange={setSelectedCollege}
          register={register}
      />
      
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={toggleForm} 
            className="
              text-[#ff297f]
              font-bold
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      noHide={true}
    />
  );
}

export default RegisterModal;