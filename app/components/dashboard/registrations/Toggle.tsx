"use client"

import { SafeEvent, SafeRegistration } from "@/app/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface ToggleProps{
    registration?: SafeRegistration;
}

const Toggle: React.FC<ToggleProps> = ({
    registration
}) => {
    const [paidStatus, setPaidStatus] = useState(registration?.hasPaid);

    const handlePaymentStatusChange = () => {
        axios.post('/api/payment', { registrationId: registration?.id })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error updating payment status:', error);
        });
    };

    const handleChange = () => {
        const newPaidStatus = !paidStatus;
        setPaidStatus(newPaidStatus);

        if (registration?.id) {
            handlePaymentStatusChange();
        }
    };
    return ( 
        <div>
            <select
                value= {paidStatus?.toString()}
                onChange={handleChange}
            >
                <option value={true.toString()}>Paid</option>
                <option value={false.toString()}>Not paid</option>
            </select>
        </div>
     );
}
 
export default Toggle;