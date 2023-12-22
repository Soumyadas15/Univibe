"use client"

import Button from "@/app/components/Button";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import { SafeEvent, SafeUser } from "@/app/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface DashboardEventImageProps {
    event: SafeEvent & {
        user: SafeUser
    };
}

const DashboardEventImage: React.FC<DashboardEventImageProps> = ({
    event,
}) => {
    const [eventImage, setEventImage] = useState(event.imageSrc);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewImageUploaded, setIsNewImageUploaded] = useState(false)
    const router = useRouter();

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
            imageSrc: event.imageSrc,
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
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        setIsLoading(true);
        
        axios.post('/api/change-image', data)
        .then(() => {
            
            router.refresh();
        }) .catch(() => {
            toast.error('Somethign went wrong');
        }) .finally(() => {
            setIsLoading(false);
            setIsNewImageUploaded(false);

        })
    }

    const onImageChange = (newImageUrl: string) => {
        console.log("New Image URL:", newImageUrl);
        setEventImage(newImageUrl);
        setCustomValue('imageSrc', newImageUrl);
        setIsNewImageUploaded(true);

    }

    return ( 
        <div className="flex flex-col gap-4">
            <div className="h-[90%]">
                <ImageUpload
                    value={eventImage!}
                    onChange={onImageChange}
                    customHeight="h-[30rem]"
                />
            </div>
            
            {isNewImageUploaded ? (
                <Button
                    disabled={isLoading}
                    label="Update"
                    onClick={handleSubmit(onSubmit)}
                />
            ) : (
                <div></div>
            )

            }
        </div>
        
    );
}
 
export default DashboardEventImage;