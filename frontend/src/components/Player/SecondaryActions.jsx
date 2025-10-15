import React from 'react'
import VolumeSeeker from "./VolumeSeeker";
import { Link } from "react-router-dom";
import { Maximize } from 'lucide-react';

const SecondaryActions = () => {
    return (
        <div className='flex items-center gap-4 pr-4' >
            <VolumeSeeker />

            <Link to={"/player"} >
                <Maximize size={20} />
            </Link>
        </div>
    )
}

export default SecondaryActions