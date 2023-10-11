

import React, { useState, useEffect } from 'react';
import getEvents from '@/app/actions/getEvents';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Slideshow from './Slideshow';


export default async function FeaturedEvents() {

    const events = await getEvents();
    const sing = events[0];
    const images = sing ? sing.imageSrc : [];

    const firstFiveEvents = events.slice(0, 5);

    const imageSrcArray = firstFiveEvents
        .map(event => event ? event.imageSrc : null)
        .filter(imageSrc => imageSrc !== null) as string[];

    console.log(imageSrcArray);

    return (
        <div className="
            
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
            overflow-hidden 
        ">
            <div className='absolute z-10 font-bold text-5xl md:text-8xl lg:text-8xl tracking-wider text-center select-text'>Live the Vibe</div>
            <Slideshow
                images={imageSrcArray}
            />
        </div>

    );
};
