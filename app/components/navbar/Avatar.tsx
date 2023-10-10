import Image from "next/image";

const Avatar = () => {
    return ( 
        <Image 
                alt = 'Logo'
                className='md:block cursor-pointer'
                height = {36}
                width = {36}
                src = '/images/avatar.png'
            />
     );
}
 
export default Avatar;