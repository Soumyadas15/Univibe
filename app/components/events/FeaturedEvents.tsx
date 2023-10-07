

import React, { useState, useEffect } from 'react';
import getEvents from '@/app/actions/getEvents';
import Image from 'next/image';
import { motion } from 'framer-motion';


export default async function FeaturedEvents() {

    const events = await getEvents();
    const sing = events[0];
    const images = sing ? sing.imageSrc : [];

    return (
        <div className="
            bg-red-400
            h-80 
            rounded-lg 
            relative 
            flex 
            flex-col
            items-center 
            justify-center
            text-white 
            select-none
            pointer-events-none
            font-custom
        ">
            <div className='absolute z-10 font-bold text-5xl md:text-8xl lg:text-8xl tracking-wider text-center select-text'>Live the Vibe</div>
            {sing && sing.imageSrc && (
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div>
                        <Image src={sing.imageSrc} alt="Event" layout="fill" objectFit="cover" className='object-cover' />
                    </div>
                    <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                </div>
            )}
        </div>

    );
};
