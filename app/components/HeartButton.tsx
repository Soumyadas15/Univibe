'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorites";
import { SafeUser } from "@/app/types";


interface HeartButtonProps {
  eventId: string
  currentUser?: SafeUser | null
  redState?: boolean
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  eventId,
  currentUser,
  redState,
}) => {
    
  const { hasFavorited, toggleFavorite } = useFavorite({
    eventId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className={`fill-white absolute -top-[2px] -right-[2px] ${
          hasFavorited && redState
            ? 'fill-[#ff0000]'
            : hasFavorited
            ? 'fill-[#4ee428]'
            : 'fill-neutral-500/70'
        }`}
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited && redState
            ? 'fill-[#ff0000]'
            : hasFavorited
            ? 'fill-[#4ee428]'
            : 'fill-none'
        }
      />
    </div>
   );
}
 
export default HeartButton;