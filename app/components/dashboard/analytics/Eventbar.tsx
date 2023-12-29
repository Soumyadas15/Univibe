"use client"

import { SafeEvent } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EventBarInterface{
    event?: SafeEvent;
    currentEvent?: boolean;
}

const EventBar: React.FC<EventBarInterface> = ({
    event,
    currentEvent
}) => {
     const router = useRouter();
    return ( 
        <div className={`
                    w-full 
                    rounded-2xl 
                    h-[10rem] 
                    flex 
                    items-center 
                    justify-center
                    ${currentEvent ? 'bg-black dark:bg-neutral-200' : 'bg-neutral-200 dark:bg-neutral-800'}
                    cursor-pointer
                `}
                onClick={() => router.push(`/dashboard/${event?.id}/analytics`)} 
            >
            <div className="w-[90%] h-[85%] flex justify-between p-1">
                <div className="h-full w-[31%] rounded-2xl overflow-hidden">
                    <Image
                        //@ts-ignore
                        src={event?.imageSrc}
                        //@ts-ignore
                        alt={event?.title}
                        height={300}
                        width={300}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="h-full w-[67%] flex flex-col items-start pl-2">
                    <div className={`
                            text-2xl 
                            font-semibold 
                            mt-1
                            ${currentEvent ? 'text-white dark:text-black' : 'text-black dark:text-white'}
                        `}>
                            {event?.title}
                    </div>
                    <div className={`
                                w-[90%] 
                                h-[60%] 
                                overflow-hidden 
                                flex text-start
                                
                        </div>
                                ${currentEvent ? 'text-neutral-400 dark:text-neutral-800' : 'text-neutral-600 dark:text-neutral-400'}
                        `}>
                            Lorem ipsummdddmmmaesssa dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuuuuuuuuuuuuuuuuuuuuuuunt
                        </div>
                </div>
            </div>
        </div>
     );
}
 
export default EventBar;