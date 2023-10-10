'use client';

import { Users2 } from "lucide-react";
import { IconType } from "react-icons";

interface EventCategoryProps {
  icon: IconType,
  label: string,
  description: string
  team?: boolean;
  members?: number;
}

const EventCategory: React.FC<EventCategoryProps> = ({ 
  icon: Icon,
  label,
  team,
  members,
  description
 }) => {
  return ( 
    <div className="flex gap-7 items-center">

      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
          <Icon size={40} className="text-[#ff297f]" />
          <div className="flex flex-col">
              <div 
                className="text-lg font-semibold"
              >
                {label}
              </div>
              
          </div>
        </div>
      </div>

      {team && (
        <div className="flex">
          <div className="border-black bg-black h-10"></div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-4">
                <Users2 size={40} className="text-[#ff297f]" />
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{members} members</div>
                  <div className="font-light">This is a team event</div>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
   );
}
 
export default EventCategory;