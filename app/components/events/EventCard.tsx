'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import moment from 'moment';

import useCountries from "@/app/hooks/useCountries";
import { 
  
  SafeEvent,
  SafeUser 
} from "@/app/types";


import Button from "../Button";
import { Event, Registration } from "@prisma/client";
import HeartButton from "../HeartButton";
import axios from "axios";
import toast from "react-hot-toast";

interface ListingCardProps {
  data: SafeEvent;
  registration?: Registration;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  showTicket?: Boolean;
};

const EventCard: React.FC<ListingCardProps> = ({
  data,
  registration,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  showTicket,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const { date } =  data;
  
  const formattedDate = moment(date).format("MMMM D, YYYY");
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [month, day, year] = formattedDate.split(' ');
  const abbreviatedMonth = month.substring(0, 3);
  const trimmedDay = day.slice(0, -1);



  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const handleClick = useCallback(() => {
    router.push(`/events/${data.id}`);
    const url = `/api/clicks/${data.id}`;
    axios.post(url)
      .then((response) => {
        console.log('Logged click:', response.data);
      })
      .catch((error) => {
        console.error('Something went wrong:', error);
        toast.error('Something went wrong');
      });
  }, [data.id]);


  return (
    <div 
      onClick={handleClick} 
      className="
          col-span-1 
          cursor-pointer 
          group 
          shadow-md 
          dark:shadow-transparent
          dark:bg-[#1e1e1e] 
          p-3 
          rounded-lg
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            // @ts-ignore
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              eventId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
        <div className="flex justify-between">
            <div className="flex flex-col gap-1">
                <div className="font-semibold text-md text-[#ff297f]">
                        {data.title}
                </div>
                <div className="text-sm dark:text-[#adadad]">
                    {data.venue}
                </div>
            </div>
            <div>
            <div className="flex text-center gap-1">
                <div>
                    <div className="font-bold text-xl">
                        {trimmedDay}
                    </div>
                    <div className="font-light text-sm">
                        {abbreviatedMonth}
                    </div>
                </div>
                
            </div>
        </div>
        </div>
      </div>
    </div>
   );
}
 
export default EventCard;