'use client'

import EventBar from "@/app/components/dashboard/analytics/Eventbar";
import { SafeEvent } from "@/app/types";
import { useState, useEffect } from 'react';

interface EventListProps{
    events?: any;
    currEvent?: SafeEvent;
}
const EventList: React.FC<EventListProps> = ({
    events,
    currEvent
}) => {

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        localStorage.setItem('scrollPosition', scrollPosition.toString());
      }, [scrollPosition]);
    
      // Retrieve scroll position from local storage on component mount
      useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
          setScrollPosition(parseInt(savedScrollPosition, 10));
        }
      }, []);
    
      // Handle scroll events
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
    
      // Attach scroll event listener
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return ( 
        <div className="w-full h-[30%] rounded-2xl overflow-hidden sticky top-10 overflow-y-scroll shadow-lg">    
            <div className="w-full overflow-y-scroll flex flex-col items-center gap-2">
                
                {events.map((myEvent: any) => (
                    <EventBar key={myEvent.id} event={myEvent} currentEvent={myEvent.id === currEvent?.id} />
                ))}
            </div>
        </div>
     );
}
 
export default EventList;