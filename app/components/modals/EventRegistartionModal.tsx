"use client"

import useEventRegistrationModal from "@/app/hooks/useEventRegistrationModal";
import Modal from "./Modal";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import { useCallback, useMemo, useState } from "react";
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import Heading from "../Heading";
import { categories } from "@/app/utils/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import GenerateDate from "@/app/utils/GenerateDate"
import DatePicker from "../inputs/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeEvent, SafeUser } from "@/app/types";
import { useUserStore } from "@/app/hooks/useCurrentUser";
import Counter from "../inputs/Counter";
import Checkbox from "../inputs/Checkbox";
import { motion } from 'framer-motion';

enum STEPS {
    DETAILS = 0,
    TEAM = 1,
    SEMESTER = 2,
    PAYMENT = 3,
}

interface EventRegistrationModalProps {
    currentUser?: SafeUser | null;
    event?: SafeEvent | null;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
    currentUser,
}) => {
    const createModal = useEventRegistrationModal();
    const successModal = useSuccessModal();
    const confettiStore = useConfettiStore();
    const [setDate, useSetDate] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const userName = currentUser ? currentUser.institute : 'College not found';
    const userCollege = currentUser?.institute;

    const [step, setStep] = useState(STEPS.DETAILS);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            phone: '',
            member1: '',
            member2: '',
            member3: '',
            semester: '',
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }
    
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    const handleSuccess = () => {
        createModal.onClose();
        confettiStore.onOpen();
        successModal.onOpen();
    }


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.SEMESTER){
            return onNext();
        }
        // setIsLoading(true);
        console.log(data);
        
        // axios.post('/api/events', data)
        // .then(() => {
        //     handleSuccess();
        //     router.refresh();
        // }) .catch(() => {
        //     toast.error('Somethign went wrong');
        // }) .finally(() => {
        //     setIsLoading(false);
        // })
        
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.SEMESTER){
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.DETAILS){
            return undefined;
        }
        return 'Back'
    }, [step]);

    const success = useCallback(() => {
        createModal.onClose();
        successModal.onOpen();
        confettiStore.onOpen();
    }, [createModal, successModal]);

    const imageSrc = watch('imageSrc');

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: "-50%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="flex flex-col gap-8">
                <Heading
                    title='Event details'
                    subtitle='Add a title and a description'
                    center
                />
                
                    <Input
                        id='name'
                        label='Name'
                        disabled={false}
                        register={register}
                        errors={errors}
                        required
                    />
                    
                    <Input
                        id='phone'
                        label='Phone'
                        disabled={false}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
            </motion.div>
        </div>
    )

    
    if (step === STEPS.TEAM){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Almost done'
                    subtitle="Add team member details"
                    center
                />
            
                    <div className="flex flex-col gap-8">
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, x: "-50%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "100%"}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col gap-8">
                        <Input
                            id='member1'
                            label='Department'
                            disabled={false}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id='member2'
                            label='Venue'
                            disabled={false}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id='member3'
                            label='Venue'
                            disabled={false}
                            register={register}
                            errors={errors}
                            required
                        />
                        </div>
                    </motion.div>
                    </div>
            </div>
        )
    }

    if (step === STEPS.SEMESTER){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Almost done'
                    subtitle="Whats your semester?"
                    center
                />
            
                    <div className="flex flex-col gap-8">
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, x: "-50%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        exit={{ opacity: 0, x: "100%"}}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col gap-8">
                        <Input
                            id='semester'
                            label='Department'
                            disabled={false}
                            register={register}
                            errors={errors}
                            required
                        />
                        </div>
                    </motion.div>
                    </div>
            </div>
        )
    }

    

    return ( 
        <Modal
            isOpen={createModal.isOpen}
            onClose={createModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.DETAILS ? undefined : onBack}
            title="Create your event"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
     );
}
 
export default EventRegistrationModal;