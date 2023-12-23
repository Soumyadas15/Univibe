"use client"

import useCreateModal from "@/app/hooks/useCreateModal";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import { categories } from "@/app/utils/categories";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { SafeEvent, SafeUser } from "@/app/types";

import useEventRegistrationModal from "@/app/hooks/useEventRegistrationModal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import DatePicker from "@/app/components/inputs/DatePicker";
import Modal from "@/app/components/modals/Modal";
import NumberInput from "@/app/components/inputs/NumberInput";
import useRegisterSuccess from "@/app/hooks/useRegisterSuccess";
import CollegeDepartmentSelect from "@/app/components/inputs/DeparmentSelect";

enum STEPS {
    DESCRIPTION = 0,
    TEAM = 1,
    SEMESTER = 2,
    PRICE = 3,
}

interface CreateModalProps {
    currentUser?: SafeUser | null;
    currEvent?: SafeEvent | null;
}

const EventRegiatrationModal: React.FC<CreateModalProps> = ({
    currentUser,
    currEvent,
}) => {
    const createModal = useCreateModal();
    const successModal = useSuccessModal();
    const confettiStore = useConfettiStore();
    const [setDate, useSetDate] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const eventRegistrationModal = useEventRegistrationModal();
    const registerSuccess = useRegisterSuccess();

    const [selectedDepartment, setSelectedDepartment] = useState('department')

    
    const eventName = currEvent ? currEvent.title : 'Event not found';
    const isPaidEvent = currEvent?.paidEvent || false;
    const userCollege = currentUser?.institute;

    const [step, setStep] = useState(STEPS.DESCRIPTION);

    const slug = useParams();

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
            semester: '',
            member1: '',
            member2: '',
            member3: '',
            phone: '',
            name: '',
            department: '',
            //@ts-ignore
            eventId: slug.eventId,
        }
    })

    const handleDateSelect = (selectedDate: dayjs.Dayjs) => {
        const formattedDate = selectedDate.toISOString();
        setCustomValue('date', formattedDate);
    };

    // const category = watch('category');


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    useEffect(() => {
        setCustomValue('department', selectedDepartment);
    }, [selectedDepartment]);
    
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }

    const handleSuccess = () => {
        eventRegistrationModal.onClose();
        toast.success('Success');
        registerSuccess.onOpen();
        router.refresh();
    }

    const handleDepartmentChange = (department: string) => {
        // Handle the selected department
        console.log('Selected Department:', department);
      };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.SEMESTER){
            return onNext();
        }

        const ticketData = {
            eventId: currEvent?.id,
            phone: data.phone,
            semester: data.semester,
            name: currentUser?.name,
            member1: data.member1,
            member2: data.member2,
            member3: data.member3,
        }
        setIsLoading(true)
        console.log(data)
        // //@ts-ignore
        
        axios.post('/api/registrations', data)
        .then(() => {
            handleSuccess();
            axios.post('/api/tickets', ticketData)
            
        }) .catch(() => {
            toast.error('Somethign went wrong');
        }) .finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.SEMESTER){
            return 'Register'
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


    let bodyContent = (
        <div className="flex flex-col gap-8">
                <Heading
                    title='Your details'
                    subtitle='These will be sent to organizers'
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
                
                <NumberInput
                    id='phone'
                    label='Phone number'
                    disabled={false}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
    )

    if (step === STEPS.TEAM){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Team details'
                    subtitle='These will be sent to organizers'
                    center
                />
                <Input
                    id='member1'
                    label='Member 1'
                    disabled={false}
                    register={register}
                    errors={errors}
                    required
                />
                
                <Input
                    id='member2'
                    label='Member 2'
                    disabled={false}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id='member3'
                    label='Member 3'
                    disabled={false}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    
    if (step === STEPS.SEMESTER){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='Almost done'
                    subtitle="Add some more details"
                    center
                />
                <CollegeDepartmentSelect
                    value={selectedDepartment}
                    collegeName={currEvent?.college!}
                    onChange={setSelectedDepartment}
                />
                <Input
                    id='semester'
                    label='Semester'
                    disabled={false}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return ( 
        <Modal
            isOpen={eventRegistrationModal.isOpen}
            onClose={eventRegistrationModal.onClose}
            actionLabel={actionLabel}
            disabled={isLoading}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.DESCRIPTION ? undefined : onBack}
            title={`Register for ${eventName}`}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            noHide
        />
     );
}
 
export default EventRegiatrationModal;