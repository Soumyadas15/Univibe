interface Icon {
    component: React.ReactElement;
    style?: React.CSSProperties;
}

interface EventDetailProps {
    label?: string | number | null;
    subtitle?: string;
    icon?: Icon;
    gradient?: string;
    increase?: number;
}

const EventDetail: React.FC<EventDetailProps> = ({
    label,
    icon
}) => {
    return ( 
        <div className="h-[50%] w-full flex items-center gap-1">
            {icon && (
                <div style={icon.style} className="">
                    {icon.component}
                </div>
            )}
            <div className="font-bold">{label}</div>
        </div>
     );
}
 
export default EventDetail;