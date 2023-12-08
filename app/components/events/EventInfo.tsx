'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "@/app/components/navbar/Avatar";
import EventCategory from "./EventCategory";
import useLikesModal from "@/app/hooks/useLikesModal";
import useLikes from "@/app/hooks/Likes";
import HeartButton from "../HeartButton";


interface EventInfoProps {
  user: SafeUser,
  description: string;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined,
  team?: boolean,
  members?: number,
  likedBy: String[],
  id: number;
  currentUser?: SafeUser | null;
}

const EventInfo: React.FC<EventInfoProps> = ({
  user,
  description,
  category,
  team,
  members,
  likedBy,
  id,
  currentUser,
}) => {

    const likes = useLikes();
    const likesModal = useLikesModal();

    let len = likedBy.length;
  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex items-center justify-between">
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
              className="flex gap-2 cursor-default"
          >
              <span className="font-bold">{len}</span> 
              people interested
              <div
                  className="text-blue-600 dark:text-blue-400 hover:opacity-75 cursor-pointer"
                  onClick={likesModal.onOpen}
              >
                view
              </div>
          </div>
        </div>
        <HeartButton
            eventId={id}
            currentUser={currentUser}
            redState
        />
      </div>
      <hr className="border-t-1 border-neutral-700" />
      {category && (
        <EventCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
          team={team}
          members={members}
        />
      )}
      <hr className="border-t-1 border-neutral-700" />
      <div className="
      text-md dark:text-[#dadada] leading-8 font-light">
        {description}
      </div>
      
    </div>
   );
}
 
export default EventInfo;