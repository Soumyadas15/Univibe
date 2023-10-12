"use client"

import useCreateModal from "@/app/hooks/useCreateModal";
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
import { SafeUser } from "@/app/types";
import { useUserStore } from "@/app/hooks/useCurrentUser";
import Counter from "../inputs/Counter";
import Checkbox from "../inputs/Checkbox";
import { motion } from 'framer-motion';

enum STEPS {
    DESCRIPTION = 0,
    CATEGORY = 1,
    IMAGES = 2,
    INFO = 3,
    MEMBERS = 4,
    DATE = 5,
}

interface CreateModalProps {
    currentUser?: SafeUser | null;
}

const CreateModal: React.FC<CreateModalProps> = ({
    currentUser,
}) => {
    const createModal = useCreateModal();
    const successModal = useSuccessModal();
    const confettiStore = useConfettiStore();
    const [setDate, useSetDate] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const userName = currentUser ? currentUser.institute : 'College not found';
    const userCollege = currentUser?.institute;

    const [step, setStep] = useState(STEPS.DESCRIPTION);

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
            category: '',
            department: '',
            venue: '',
            imageSrc: '',
            team: false,
            memberCount: 1,
            title: '',
            description: '',
            date: '',
        }
    })

    const handleDateSelect = (selectedDate: dayjs.Dayjs) => {
        const formattedDate = selectedDate.toISOString();
        setCustomValue('date', formattedDate);
    };

    const category = watch('category');
    const memberCount = watch('memberCount');
    const team = watch('team');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const handleTeamCheckboxChange = (value: boolean) => {
        setCustomValue('team', value);
        if (value) {
            setCustomValue('memberCount', 2); 
        }
        if (!value) {
            setCustomValue('memberCount', 1); 
        }
    };
    
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
        if (step !== STEPS.DATE){
            return onNext();
        }
        setIsLoading(true);
        
        axios.post('/api/events', data)
        .then(() => {
            handleSuccess();
            router.refresh();
        }) .catch(() => {
            toast.error('Somethign went wrong');
        }) .finally(() => {
            setIsLoading(false);
        })
        
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.DATE){
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.DESCRIPTION){
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
                        id='title'
                        label='Title'
                        disabled={false}
                        register={register}
                        errors={errors}
                        required
                    />
                    
                    <Input
                        id='description'
                        label='Description'
                        disabled={false}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
            </motion.div>
        </div>
    )

    if (step === STEPS.CATEGORY){
        bodyContent = (
            <div className="object-fit">
                
                <div className="flex flex-col gap-8">
                <Heading
                    title='Which of these best describes the event?'
                    subtitle="Pick a category"
                    center
                />
                <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: "-50%" }}
                    animate={{ opacity: 1, x: "0%"  }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-3
                            max-h-[50vh]
                            overflow-y-auto
                        "
                    >
                        {categories.map((item) => (
                            <div key={item.label} className="col-span-1">
                                <CategoryInput
                                    onClick={(category) => {setCustomValue('category', category)}}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
        )
    }
    if (step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Add image'
                    subtitle="Upload event banner"
                    center
                />
                <motion.div
                    key="images"
                    initial={{ opacity: 0, x: "-50%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ImageUpload
                        value={imageSrc}
                        onChange={(value) => setCustomValue('imageSrc', value)}
                    />
                </motion.div>
            </div>
            
        )
    }
    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Almost done'
                    subtitle="Add some more details"
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
                            id='department'
                            label='Department'
                            disabled={false}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id='venue'
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

    if (step === STEPS.MEMBERS){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Member info'
                    subtitle="Is this a team event?"
                    center
                />
                <div className="flex flex-col gap-8">
                <motion.div
                    key="members"
                    initial={{ opacity: 0, x: "-50%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="flex flex-col gap-8">
                        <Checkbox
                            title="Team event"
                            value = {team}
                            onChange={handleTeamCheckboxChange}
                        />
                        <hr className="border-t-1 border-neutral-500 dark:border-neutral-800" />
                        <Counter
                            onChange={(value) => setCustomValue('memberCount', value)}
                            value={memberCount}
                            disabled={!team}
                            start={2}
                            end={5}
                            title="Member count" 
                            subtitle="How many members should teams consist?"
                        />
                    </div>
                </motion.div>
                </div>
            </div>
        )
    }

    if (step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Date'
                    subtitle="Add event date"
                    center
                />
                <motion.div
                    key="calender"
                    initial={{ opacity: 0, x: "-50%" }}
                    animate={{ opacity: 1, x: "0%" }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="flex items-center justify-center">
                        <DatePicker
                            onClick={() => {}}
                            onSelectDate={handleDateSelect}
                        />
                    </div>
                </motion.div>
                
            </div>
        )
    }

    return ( 
        <Modal
            isOpen={createModal.isOpen}
            onClose={createModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.DESCRIPTION ? undefined : onBack}
            title="Create your event"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
     );
}
 
export default CreateModal;