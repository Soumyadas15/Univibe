'use client'

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const SLIDE_DURATION = 3000;

const variants = {
    initial: {
        x: 1500,
        opacity: 1,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    exit: {
        x: -3500,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

interface SlideshowProps {
    images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="rounded-lg">
            {images.map((imageSrc, index) => (
                <motion.img
                    key={index}
                    src={imageSrc}
                    variants={variants}
                    initial="initial"
                    animate={index === currentSlide ? "animate" : "initial"}
                    exit="exit"
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: index === currentSlide ? 0 : SLIDE_DURATION / 1000,
                    }}
                    alt={`Event ${index + 1}`}
                    className={`object-cover w-full h-full rounded-lg absolute top-0 left-0 ${
                        index === currentSlide ? "z-0" : "z-0"
                    }`}
                />
            ))}
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        </div>
    );
};

export default Slideshow;
