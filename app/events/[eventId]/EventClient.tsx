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
import { useCallback, useEffect, useMemo, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/app/actions/order.actions";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import useTicketModal from "@/app/hooks/useTicketModal";

interface EventClientProps {
    registrations?: Registration[];
    event: SafeEvent & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    isRegistered?: boolean;
}


loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const EventClient: React.FC<EventClientProps> = ({
    event,
    currentUser,
    isRegistered

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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const ticketModal = useTicketModal();

    const handleOpen = () => {
        console.log('clicked');
        incompleteModal.onOpen();
    }

    const onCheckout = async () => {
        // console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
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
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);

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
        ticketModal.onOpen();
    })

    // let likedBy = [...(event?.likedBy || [])];
    const coordinates: [number, number] = [40.748817, -73.985428];

    return ( 
       <Container>
        <div className="max-w-screen-lg mx-auto pt-24 pb-20">
            <div className="flex flex-col gap-6 mt-[-25px]">
                <EventHead
                    title={event.title}
                    // @ts-ignore
                    imageSrc={event.imageSrc}
                    id={event.id}
                    currentUser={currentUser}
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <EventInfo
                        user={event.user}
                        // @ts-ignore
                        category={category}
                        // @ts-ignore
                        description={event.description}
                        // likedBy={likedBy}
                        //@ts-ignore
                        team={event?.team}
                        id={event.id}
                        currentUser={currentUser}
                        //@ts-ignore
                        members={event.memberCount}
                    />
                    <div
                        className='
                            order-last
                            mt-6
                            md:mt-0
                            md:order-last
                            md:col-span-3
                            
                        '
                    >
                        <div className="flex flex-col gap-6">
                            <Map
                                center={coordinates}
                            />
                            <EventDateInfo
                                day={trimmedDay}
                                month={abbreviatedMonth}
                                year={year}
                                //@ts-ignore
                                venue={event.venue}
                                //@ts-ignore
                                department={event.department}
                                direction='flex-col'
                            />
                            <div className="mb-7">
                            
                            
                            {isRegistered ? (
                                <div className="flex flex-col sm:flex-col md:flex-row gap-3">
                                    {event.cancellable ? (
                                        <Button
                                            disabled={isLoading}
                                            label='Cancel'
                                            onClick={handleCancelRegistration}
                                        />
                                    ) : (
                                            <Button
                                                disabled
                                                label='Cancellation unavailable'
                                                onClick={() => {}}
                                            />
                                        )
                                    }
                                    
                                    <Button
                                            label='View Ticket'
                                            onClick={viewTicket}
                                            outline
                                    />

                                    </div>
                                
                                ) : (
                                <Button
                                    disabled={false}
                                    label='Register'
                                    onClick={eventRegistrationModal.onOpen}
                                />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </Container>
     );
}
 
export default EventClient;