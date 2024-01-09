import { SafeEvent } from "@/app/types";
import EventDetail from "./EventDetail";
import { Calendar, DollarSign, LocateIcon, MousePointerClick, Users2 } from "lucide-react";
import { BiLocationPlus } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import moment from "moment";

interface EventDateInfo2Props {
    event?: SafeEvent
}

const EventDateInfo2: React.FC<EventDateInfo2Props> = ({
    event,
}) => {

   const date = event?.date;
  
    const formattedDate = moment(date).format("MMMM D, YYYY");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const [month, day, year] = formattedDate.split(' ');
    const abbreviatedMonth = month.substring(0, 3);
    const trimmedDay = day.slice(0, -1);
    
    return ( 
        <div className="h-[13rem] w-full flex items-center justify-start">
            <div className="h-[90%] w-full flex flex-col items-start justify-between gap-6 ">
                <div className="flex items-center gap-4 w-full">
                    <EventDetail
                        label={event?.category}
                        icon={{ component: <MdLocationPin size={30} className="text-rose-600"/>}}
                    />
                    <EventDetail
                        label={`${abbreviatedMonth} ${day} ${year}`}
                        icon={{ component: <Calendar size={30} className="text-rose-600"/>}}
                    />
                    <EventDetail
                        label={event?.category}
                        icon={{ component: <MdLocationPin size={30} className="text-rose-600"/>}}
                    />
                </div>
                <div className="flex items-center gap-4 justify-between">
                    <EventDetail
                        label={event?.college}
                        icon={{ component: <MdLocationPin size={30} className="text-rose-600"/>}}
                    />
                </div>
                <EventDetail
                        label ={`${event?.memberCount} members`}
                        icon={{ component: <Users2 size={30} className="text-rose-600"/>}}
                />
                <div>
                {event?.price! > 0 ? (
                            <div className="bg-green-200 p-3 rounded-full dark:bg-green-600">
                                <EventDetail
                                    label={event?.price}
                                    icon={{ component: <DollarSign size={20} className="text-green-700 dark:text-green-200"/>}}
                                />
                            </div>
                        ) : (
                            <div className="bg-green-200 p-3 rounded-full dark:bg-green-600">
                                <EventDetail
                                    label='Free'
                                    icon={{ component: <DollarSign size={20} className="text-green-200"/>}}
                                />
                            </div>
                        )
                }
                </div>
               
            </div>
            
        </div>
     );
}
 
export default EventDateInfo2;