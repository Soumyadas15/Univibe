"use client"

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import EventDateInfo from "@/app/components/events/EventDateInfo";
import EventHead from "@/app/components/events/EventHead";
import EventInfo from "@/app/components/events/EventInfo";
import { SafeEvent, SafeUser } from "@/app/types";
import { categories } from "@/app/utils/categories";
import { Registration } from "@prisma/client"
import moment from "moment";
import { useMemo } from "react";

interface EventClientProps {
    registrations?: Registration[];
    event: SafeEvent & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}


const EventClient: React.FC<EventClientProps> = ({
    event,
    currentUser
}) => {

    const { date } =  event;
  
    const formattedDate = moment(date).format("MMMM D, YYYY");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const [month, day, year] = formattedDate.split(' ');
    const abbreviatedMonth = month.substring(0, 3);
    const trimmedDay = day.slice(0, -1);

    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === event.category);
    }, [event.category])

    let likedBy = [...(event?.likedBy || [])];

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
                        likedBy={likedBy}
                    />
                    <div
                        className='
                            order-last
                            mb-10
                            md:order-last
                            md:col-span-3
                            
                        '
                    >
                        <div className="flex flex-col gap-5">
                            <EventDateInfo
                                day={trimmedDay}
                                month={abbreviatedMonth}
                                year={year}
                                //@ts-ignore
                                venue={event.venue}
                                //@ts-ignore
                                department={event.department}
                            />
                            <Button
                                label="Register"
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </Container>
     );
}
 
export default EventClient;