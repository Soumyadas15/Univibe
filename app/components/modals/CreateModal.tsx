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

enum STEPS {
    DESCRIPTION = 0,
    CATEGORY = 1,
    IMAGES = 2,
    INFO = 3,
    DATE = 4,
}

const CreateModal = () => {
    const createModal = useCreateModal();
    const successModal = useSuccessModal();
    const confettiStore = useConfettiStore();
    const [setDate, useSetDate] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
        if (step !== STEPS.DATE){
            return onNext();
        }
        console.log(data);
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
                <Heading
                    title='Event details'
                    subtitle='Add a title and a description'
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
    )

    if (step === STEPS.CATEGORY){
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
                title='Which of these best describes the event?'
                subtitle="Pick a category"
                center
            />
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
        </div>
        )
    }
    if (step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Add image'
                    subtitle="Pick a category"
                    center
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
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
        )
    }
    if (step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Date'
                    subtitle="Pick a category"
                    center
                />
                <div className="flex items-center justify-center">
                    <DatePicker
                        onClick={() => {}}
                        onSelectDate={handleDateSelect}
                    />
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
            secondaryAction={step == STEPS.DESCRIPTION ? undefined : onBack}
            title="Create your event"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
     );
}
 
export default CreateModal;