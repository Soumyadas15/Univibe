import { SafeEvent } from "@/app/types";
import EventDetail from "./EventDetail";
import { Calendar, LocateIcon, MousePointerClick } from "lucide-react";
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
        <div className="h-[10rem] w-full flex items-center justify-start">
            <div className="h-[90%] w-full flex flex-col items-center justify-between gap-8">
                <div className="flex items-center gap-4 w-full">
                    <EventDetail
                        label={event?.college}
                        icon={{ component: <MdLocationPin size={30} className="text-rose-600"/>}}
                    />
                    <EventDetail
                        label={formattedDate}
                        icon={{ component: <Calendar size={30} className="text-rose-600"/>}}
                    />
                    <EventDetail
                        label={event?.college}
                        icon={{ component: <MdLocationPin size={30} className="text-rose-600"/>}}
                    />
                </div>
                <div className="flex flex-col items-start gap-4 w-full">
                    <EventDetail
                        label={event?.college}
                        icon={{ component: <MdLocationPin size={30} className="text-rose-600"/>}}
                    />
                    <EventDetail
                        label={formattedDate}
                        icon={{ component: <Calendar size={30} className="text-rose-600"/>}}
                    />
                    
                </div>
               
            </div>
            
        </div>
     );
}
 
export default EventDateInfo2;