"use client"

import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
    title: string;
    redirect: string;
}
const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    redirect,
}) => {
    const router = useRouter();
    const handleView = () => {
        router.push(redirect)
    }
    return ( 
        <div>
           <div className='mt-10 flex justify-between'>
                <div className='font-bold text-2xl'>{title}</div>
                <div 
                    onClick={handleView}
                    className='
                    text-blue-500 
                    hover:opacity-75 
                    cursor-pointer
                '>
                    View all
                </div>
            </div> 
        </div>
     );
}
 
export default PageHeader;