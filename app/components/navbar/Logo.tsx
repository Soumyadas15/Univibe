'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div 
            onClick={handleLogoClick} 
            className='
                items-center 
                justify-center 
                flex 
                gap-2
                cursor-pointer
            '>
            <Image 
                alt = 'Logo'
                className='md:block cursor-pointer'
                height = {36}
                width = {36}
                src = '/images/logo.png'

            />
            <div>
                <h1 
                    className='
                    font-semibold 
                    text-2xl 
                    text-pink-600
                '>
                    univibe
                </h1>
            </div>
        </div>

    )
}
export default Logo;