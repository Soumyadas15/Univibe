'use client';

import { IconType } from "react-icons";

interface EventCategoryProps {
  icon: IconType,
  label: string,
  description: string
}

const EventCategory: React.FC<EventCategoryProps> = ({ 
  icon: Icon,
  label,
  description
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-[#ff297f]" />
        <div className="flex flex-col">
            <div 
              className="text-lg font-semibold"
            >
              {label}
            </div>
            <div 
              className="font-light"
            >
              {description}
            </div>
        </div>
        
      </div>
    </div>
   );
}
 
export default EventCategory;