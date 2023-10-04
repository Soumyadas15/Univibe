'use client';

import { useRouter } from "next/navigation";
import Lottie from "lottie-react";

import Button from "./Button";
import Heading from "./Heading";
import animationData from '@/public/assets/emptyState.json'

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No events found",
    subtitle = "Well well well...",
    showReset
}) => {
    const router = useRouter();

    return ( 
        <div 
            className="
                h-[60vh]
                flex 
                flex-col 
                gap-2 
                justify-center 
                items-center 
            "
            >
            <Lottie animationData={animationData} className="w-48"/>
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
                )}
            </div>
        </div>
    );
}
 
export default EmptyState;