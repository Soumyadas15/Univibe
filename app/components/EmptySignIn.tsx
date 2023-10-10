'use client';

import { useRouter } from "next/navigation";
import Lottie from "lottie-react";

import Button from "./Button";
import Heading from "./Heading";
import animationData from '@/public/assets/emptyState.json'

interface EmptySignInProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptySignIn: React.FC<EmptySignInProps> = ({
    title = "Please sign in",
    subtitle = "to find events in your college",
    showReset
}) => {
    const router = useRouter();

    return ( 
        <div 
            className="
                h-[40vh]
                flex 
                flex-col 
                gap-2 
                justify-center 
                items-center 
            "
            >
            <Lottie animationData={animationData} className="w-40"/>
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            {showReset && (
                <div className="w-48 mt-4">
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push('/')}
                    />
                </div>
            )}
            
        </div>
    );
}
 
export default EmptySignIn;