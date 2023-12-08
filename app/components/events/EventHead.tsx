'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Heading2 from "../Heading2";

interface EventHeadProps {
  title: string;
  imageSrc: string;
  id: number;
  currentUser?: SafeUser | null
}

const EventHead: React.FC<EventHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser
}) => {

  return ( 
    <>
    <Heading2
        title={title}
      />
        <div className="
            w-full
            h-[40vh]
            md:h-[60vh]
            overflow-hidden 
            rounded-xl
            relative
            bg-red-400
          "
        >
          
          <Image
            src={imageSrc}
            fill
            className="object-cover w-full"
            alt="Image"
          />
          <div
            className="
              absolute
              top-5
              right-5
            "
          >
          </div>
        </div>
    </>
   );
}
 
export default EventHead;