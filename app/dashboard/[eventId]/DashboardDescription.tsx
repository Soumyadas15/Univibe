"use client"

import React, { useEffect, useRef, useState } from "react";
import Button from "@/app/components/Button";
import { SafeEvent, SafeUser } from "@/app/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DashboardDescriptionProps {
    event: SafeEvent & {
        user: SafeUser
    };
}

const DashboardDescription: React.FC<DashboardDescriptionProps> = ({ event }) => {
    const [eventDesc, setEventDesc] = useState(event.description);
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState(false);
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const editHandler = () => {
        setIsEditing(!isEditing);
    };

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
            desc: event.description,
            eventId: event.id,
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }


    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            //@ts-ignore
            textarea.style.height = 'inherit';
            //@ts-ignore
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

     //@ts-ignore
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (newValue !== event.description) {
            setEdited(true);
        }
        else if (newValue === event.description) {
            setEdited(false);
        }
        setEventDesc(newValue);
        setCustomValue('desc', newValue);
        adjustHeight();
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        setIsLoading(true);
        
        axios.post('/api/change-desc', data)
        .then(() => {
            
            router.refresh();
        }) .catch(() => {
            toast.error('Somethign went wrong');
        }) .finally(() => {
            setIsLoading(false);
            setEdited(false);
            setIsEditing(false);

        })
    }

    return ( 
        <div className="flex flex-col gap-6">
            {isEditing ? (
                <textarea
                    //@ts-ignore
                    defaultValue={eventDesc}
                    className="w-full"
                    style={{ overflow: 'hidden' }}
                    ref={textareaRef}
                    onInput={handleInputChange}
                ></textarea>
            ) : (
                <div className="text-justify leading-8 font-light">
                    {eventDesc}
                </div>
            )}
            <div className="flex gap-4">
                <div className="w-[20%]">
                    <Button
                        label={isEditing ? "Done" : "Edit"}
                        onClick={editHandler}
                    />
                </div>
                <div className="w-[20%]">
                    {edited ? (
                            <Button
                                label="Update"
                                disabled={isLoading}
                                onClick={handleSubmit(onSubmit)}
                            />
                        ) : (
                            <div></div>
                        )
                
                    }
                </div>
            </div>
        </div>
    );
}
 
export default DashboardDescription;
