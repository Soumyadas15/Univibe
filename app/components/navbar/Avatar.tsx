import Image from "next/image";

const Avatar = () => {
    return ( 
        <Image 
                alt = 'Logo'
                className='hidden md:block cursor-pointer'
                height = {36}
                width = {36}
                src = '/images/avatar.png'

            />
     );
}
 
export default Avatar;