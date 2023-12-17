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
import { useCallback, useMemo } from "react";

interface EventClientProps {
    registrations?: Registration[];
    event: SafeEvent & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    isRegistered?: boolean;
}


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

    const handleOpen = () => {
        console.log('clicked');
        incompleteModal.onOpen();
    }

    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === event.category);
    }, [event.category])

    // let likedBy = [...(event?.likedBy || [])];
    const coordinates: [number, number] = [40.748817, -73.985428];

    return ( 
       <Container>
        <div className="max-w-screen-lg mx-auto">
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
                            />
                            <div className="mb-7">
                            
                            
                            {isRegistered ? (
                                <div className="flex flex-col sm:flex-col md:flex-row gap-3">
                                    <Button
                                        disabled={true}
                                        label='Registered'
                                        onClick={() => {}}
                                    />
                                    <Button
                                        label='Generate Ticket'
                                        onClick={() => {}}
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