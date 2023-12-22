

interface Icon {
    component: React.ReactElement;
    style?: React.CSSProperties;
}

interface DataCardProps {
    label?: string | number | null;
    subtitle?: string;
    icon?: Icon;
}

const DataCard: React.FC<DataCardProps> = ({
    label,
    subtitle,
    icon,
}) => {
    return ( 
        <div className="
                bg-neutral-300
                dark:bg-neutral-800
                rounded-lg
                w-[33%]
                h-full
                flex
                items-center
                justify-center
        ">
            <div className=" w-[80%] h-[80%] flex items-end justify-between">
                <div className="h-[40%] w-[50%] flex flex-col justify-end gap-2">
                    <div className="font-bold text-6xl text-black dark:text-white">{label}</div>
                    <div className="text-xl">{subtitle}</div>
                </div>
                {icon && (
                    <div style={icon.style} className="">
                        {icon.component}
                    </div>
                )}
            </div>
            
        </div>
     );
}
 
export default DataCard;