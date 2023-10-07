'use client'

interface Heading2Props {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading2: React.FC<Heading2Props> = ({
    title,
    subtitle,
    center
}) => {
    return ( 
        <div className={center ? 'text-center' : 'text-start'}>
            <div className='
                text-3xl 
                text-black 
                dark:text-white 
                font-bold
            '>
                {title}
            </div>
            <div className='font-light text-black dark:text-white mt-2'>
                {subtitle}
            </div>
        </div>
     );
}
 
export default Heading2;