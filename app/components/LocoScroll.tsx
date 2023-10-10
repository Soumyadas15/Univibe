"use client"

import React, { useEffect, ReactNode } from 'react';

interface LocomotiveScrollWrapperProps {
    children: ReactNode;
}

const LocoScroll: React.FC<LocomotiveScrollWrapperProps> = ({ children }) => {
  useEffect(() => {
    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    };

    initLocomotiveScroll();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  return <div>{children}</div>;
};

export default LocoScroll;
