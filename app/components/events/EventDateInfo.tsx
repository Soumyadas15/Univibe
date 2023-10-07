import { CalendarDays, GraduationCap, MapPin } from "lucide-react";

interface EventDateInfoProps {
    day: string;
    month: string;
    year: string;
    venue: string;
    department: string,
}

const EventDateInfo: React.FC<EventDateInfoProps> = ({
    day,
    month,
    year,
    venue,
    department
}) => {
    return ( 
        <div className="
            flex
            gap-2
            items-end
            md:items-center
            lg:items-center
            justify-center
            bg-neutral-100
            dark:bg-[#212121]
            rounded-lg
            p-5
        ">
            <div className="flex flex-col items-baseline gap-8">
                <div className="flex items-center justify-center gap-3">
                    <div className="text-white bg-[#ff297f] rounded-full p-4">
                        <CalendarDays size={30}/>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="text-xl font-bold">{day}</div>
                        <div className="text-lg">{month}</div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 max-w-1">
                    <div className="text-white bg-[#ff297f] rounded-full p-4">
                        <MapPin size={30}/>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="text-xl font-bold">{venue}</div>
                        <div className="text-lg">venue</div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 max-w-1">
                    <div className="text-white bg-[#ff297f] rounded-full p-4">
                        <GraduationCap size={30}/>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="text-xl font-bold">{department}</div>
                        <div className="text-lg">Organizing committee</div>
                    </div>
                </div>
            </div>
        </div>
        
     );
}
 
export default EventDateInfo;