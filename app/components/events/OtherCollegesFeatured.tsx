import React, { useState, useEffect } from 'react';
import getEvents from '@/app/actions/getEvents';
import Image from 'next/image';
import { motion } from 'framer-motion';
import getCurrentUser from '@/app/actions/getCurrentUser';
import FeaturedEvents1 from './FeaturedEvents1';
  
export default async function OtherCollegesFeatured() {
    const currentUser = await getCurrentUser();
    const events = await getEvents();
    const currUserCollege = currentUser?.institute;

    let notInMyCollege = events.filter((event) => event.college !== currUserCollege);
    const event1 = notInMyCollege[0];
    const event2 = notInMyCollege[1];

    return (
        <div 
            className='
                pt-2
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-2
                xl:grid-cols-2
                2xl:grid-cols-2
                gap-8
                h-[300px]
                relative
        '>
            <FeaturedEvents1
                title={event1.title}
                college={event1?.college}
                image={event1?.imageSrc}
            />
            <FeaturedEvents1
                
                title={event2.title}
                college={event2?.college}
                image={event2?.imageSrc}
            />
            
        </div>

    );
};
