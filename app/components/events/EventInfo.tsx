'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "@/app/components/navbar/Avatar";
import EventCategory from "./EventCategory";
import useLikesModal from "@/app/hooks/useLikesModal";
import useLikes from "@/app/hooks/Likes";


interface EventInfoProps {
  user: SafeUser,
  description: string;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined,
  likedBy: String[],
}

const EventInfo: React.FC<EventInfoProps> = ({
  user,
  description,
  category,
  likedBy,
}) => {

    const likes = useLikes();
    const likesModal = useLikesModal();

    let len = likedBy.length;
  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div className="">Created by {user?.name}</div>

          <Avatar 
           // @ts-ignore
            src={user?.image} 
          />
        </div>
        <div
            className="flex gap-2 cursor-pointer"
            onClick={likesModal.onOpen}
        >
            <span className="font-bold">{len}</span> 
            people interested

        </div>
      </div>
      <hr className="border-t-1 border-neutral-700" />
      {category && (
        <EventCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr className="border-t-1 border-neutral-700" />
      <div className="
      text-lg font-light">
        {description}
      </div>
      
    </div>
   );
}
 
export default EventInfo;