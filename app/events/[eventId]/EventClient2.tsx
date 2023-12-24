"use client"

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Map from "@/app/components/Map";
import EventDateInfo from "@/app/components/events/EventDateInfo";
import EventHead from "@/app/components/events/EventHead";
import EventInfo from "@/app/components/events/EventInfo";
import useCreateModal from "@/app/hooks/useCreateModal";
import useEventRegistrationModal from "@/app/hooks/useEventRegistrationModal";
import useIncompleteModal from "@/app/hooks/useIncompleteModal";
import { SafeEvent, SafeUser } from "@/app/types";
import { categories } from "@/app/utils/categories";
import { Registration } from "@prisma/client"
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/app/actions/order.actions";
import Image from "next/image";
//@ts-ignore
import ColorThief from 'colorthief';
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useTicketModal from "@/app/hooks/useTicketModal";

interface EventClient2Props {
    registrations?: Registration[];
    event: SafeEvent & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    isRegistered?: boolean;
    ticketData: any;
}


loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const EventClient2: React.FC<EventClient2Props> = ({
    event,
    currentUser,
    isRegistered,
    ticketData

}) => {

    const { date } =  event;
  
    const formattedDate = moment(date).format("MMMM D, YYYY");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const [month, day, year] = formattedDate.split(' ');
    const abbreviatedMonth = month.substring(0, 3);
    const trimmedDay = day.slice(0, -1);
    

    const eventRegistrationModal = useEventRegistrationModal();
    const incompleteModal = useIncompleteModal();
    const createModal = useCreateModal();
    const [cloudinaryUrl, setCloudinaryUrl] = useState('');
    const [colorPalette, setColorPalette] = useState<string[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const ticketModal = useTicketModal();

    

    const handleOpen = () => {
        console.log('clicked');
        incompleteModal.onOpen();
    }


    useEffect(() => {
        if (imageRef.current) {
            const colorThief = new ColorThief();
            
            if (imageRef.current.complete) {
                const palette = colorThief.getPalette(imageRef.current, 10); 
                //@ts-ignore
                setColorPalette(palette.map(rgb => `rgb(${rgb.join(',')})`));
            } else {
                imageRef.current.addEventListener('load', () => {
                    const palette = colorThief.getPalette(imageRef.current, 10);
                    //@ts-ignore
                    setColorPalette(palette.map(rgb => `rgb(${rgb.join(',')})`));
                });
            }
        }
    }, [event.imageSrc]);



    const [color1, color2, color3, color4, color5, color6] = colorPalette.length >= 6 
        ? colorPalette 
        : ['#FF00F5', '#00FF75', '#D50000', '#FF5733', '#33FF57', '#3357FF'];


    
    const gradientStyle = {
        background: `linear-gradient(360deg, ${color1} 20%, ${color2} 50%, ${color3} 100%), radial-gradient(100% 164.72% at 100% 100%, ${color4} 0%, ${color5} 50%, ${color6} 100%), radial-gradient(100% 148.07% at 0% 0%, ${color6} 0%, ${color5} 50%, ${color4} 100%)`,
        backgroundBlendMode: 'overlay, difference, normal'
    };




    
    const onCheckout = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event.id,
            price: event.price,
            paidEvent: event.paidEvent,
            buyerId: currentUser?.id,
        }
        //@ts-ignore
        await checkoutOrder(order);
    }

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);





    //Handles registration cancellation

    const handleCancelRegistration = async () => {
        setIsLoading(true);
    
        axios
            .delete('/api/registrations', {
                data: {
                    eventId: event.id,
                    userId: currentUser?.id,
                },
            })
            .then(() => {
                toast.success('Registration cancelled successfully');
                eventRegistrationModal.onClose();
                router.refresh();
                axios.delete('/api/tickets', {
                    data: {
                        eventId: event.id,
                        userId: currentUser?.id,
                    }
                })
            })
            .catch((error) => {
                // Handle errors here if needed
                console.error('Error cancelling registration:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === event.category);
    }, [event.category])



    const viewTicket = (() => {
        console.log(ticketData);
        ticketModal.onOpen();
    })



    // let likedBy = [...(event?.likedBy || [])];
    const coordinates: [number, number] = [40.748817, -73.985428];

    return ( 
       <Container>
        <div className="flex w-full items-start gap-20"> 
            <div className="sticky top-0 flex h-screen w-full items-center">
                <div className="relative w-full h-[90%] overflow-none transition duration-500">
                    {/* Gradient Div */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center blur-none dark:blur-2xl transition duration-500" style={gradientStyle}></div>
                    
                    {/* Image */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[85%] h-[85%]">
                        <div className=" 
                                    w-[90%] 
                                    h-[90%] 
                                    relative 
                                    overflow-hidden "
                        >
                            <img
                                ref={imageRef}
                                alt={event.title}
                                //@ts-ignore
                                src={event.imageSrc}
                                className="
                                    object-cover 
                                    h-full 
                                    w-full
                                "
                                
                                crossOrigin="anonymous"
                            />
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className="w-full ">
                <div className="flex flex-col gap-6 items-start mt-20">
                    <div className="text-4xl font-bold">
                        {event.title}
                    </div>
                    <div className="">
                       <p>Created by {event?.title}</p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className="w-[49%] h-full">
                        {isRegistered ? (
                            event.cancellable ? (
                                <Button
                                    disabled={isLoading}
                                    label='Cancel'
                                    onClick={handleCancelRegistration}
                                />
                            ) : (
                                <div></div>
                            )
                        ) : (
                            <Button
                                disabled={isLoading}
                                label='Register'
                                onClick={eventRegistrationModal.onOpen}
                            />
                        )}
                        </div>
                        <div className="w-[49%] h-full">
                            {isRegistered ? (
                                <Button
                                    disabled={false}
                                    label='View ticket'
                                    onClick={viewTicket}
                                    outline
                                />
                            ) : (
                                <div className="hidden">
                                    <Button
                                        disabled={true}
                                        label='Generate ticket'
                                        onClick={() => {}}
                                        outline
                                    />
                                </div>
                                
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-start mt-10">
                        <div className="text-xl font-bold">About {event.title}</div>
                        <div className="text-md dark:text-[#dadada] leading-8 font-light">
                            {event.description}
                            
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <Map
                            center={coordinates}
                        />
                    </div>
                    
                    
                </div>
                

            </div>
        </div>
       </Container>
     );
}
 
export default EventClient2;