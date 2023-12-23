import { MoveUp } from "lucide-react";


interface Icon {
    component: React.ReactElement;
    style?: React.CSSProperties;
}

interface DataCardProps {
    label?: string | number | null;
    subtitle?: string;
    icon?: Icon;
    gradient?: string;
    increase?: number;
}

const DataCard: React.FC<DataCardProps> = ({
    label,
    subtitle,
    icon,
    gradient,
    increase,
}) => {
    return ( 
        <div className={`
                ${gradient}
                shadow-lg
                dark:bg-neutral-800
                rounded-xl
                w-[33%]
                h-full
                flex
                items-center
                justify-center
        `}>
            <div className=" w-[80%] h-[80%] flex flex-col items-end justify-between ">
                {/* <div className="h-full w-[30%] flex flex-col justify-between gap-2 bg-blue-400">
                    <div className="text-xl">{subtitle}</div>
                    <div className="font-bold text-6xl text-black dark:text-white">{label}</div>
                </div>
                <div className="h-[40%] w-[50%] bg-yellow-400 flex items-center justify-end">
                    <div className="bg-green-400 flex items-end">
                        <MoveUp size={30}/>
                        <div className="flex items-start">
                            <div>+20 today</div>
                            
                        </div>
                    </div>
                    
                </div> */}
                <div className="w-full h-[20%] flex items-center justify-between">
                    <div className="text-xl font-semibold">{subtitle}</div>
                    {icon && (
                        <div style={icon.style} className="">
                            {icon.component}
                        </div>
                    )}
                </div>
                <div className=" w-full h-[30%] flex items-end justify-between">
                    <div className="font-semibold text-6xl text-black dark:text-white">{label}</div>
                    <div className=" flex items-center pb-1">
                        <MoveUp size={20}/>
                        <div className="flex items-start">
                            <div>+{increase} today</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default DataCard;