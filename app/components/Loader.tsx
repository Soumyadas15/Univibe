'use client';

import { PuffLoader } from "react-spinners";
import animationdata from '@/public/assets/loader.json'
import Lottie from "lottie-react";

const Loader = () => {
  return ( 
    <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <div className="h-[200px] w-[200px]">
          <Lottie animationData={animationdata} size={10}/>
      </div>
    </div>
   );
}
 
export default Loader;