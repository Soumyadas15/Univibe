"use client"

import { SafeEvent } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface FeaturedEvents1Props {
    title: string | null;
    college: string | null;
    image: string | null;
}

const FeaturedEvents1: React.FC<FeaturedEvents1Props> = ({
    title,
    college,
    image
}) => {
    const router = useRouter();
    return ( 
        <div onClick={() => {}}>
            <div className='
                col-span-1 
                cursor-pointer 
                group  
                shadow-md 
                bg-red-400
                h-full
                p-3 
                rounded-lg
                overflow-hidden 
                relative
            '>
                <Image
                    //@ts-ignore
                    src={image}
                    fill 
                    alt='img' 
                    className='
                        object-cover 
                        h-full 
                        w-full 
                        group-hover:scale-105
                        transition
                        rounded-lg
                '/>
                <Image
                    src='/images/overlay.png'
                    fill 
                    alt='img' 
                    className='
                        object-cover 
                        h-full 
                        w-full 
                        rounded-lg
                        mix-blend-multiply
                        hidden
                        group-hover:block
                        transition
                        duration-1000
                        opacity-60
                '/>

                <div className='
                    absolute
                    bottom-10
                    left-10
                    text-white
                    font-bold
                    hidden
                    group-hover:block
                    transition
                    w-full
                '>
                    <div className='flex'>
                        <div>
                            <div className='text-2xl'>{title}</div>
                            <div className='font-light text-lg'>{college}</div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FeaturedEvents1;