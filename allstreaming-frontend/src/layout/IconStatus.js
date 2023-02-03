import React from 'react';
import { AiFillCloseCircle  } from "react-icons/ai";
import { BsDashCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

const IconStatus = (props) => {
    const { statusForIcon } = props;

    let icon;

    switch (statusForIcon) {
        case 'Available':
            icon = <FaCheckCircle className='text-success'/>
            break;
        case 'Used':
            icon = <BsDashCircleFill className='text-warning'/>
            break;
        default:
            icon = <AiFillCloseCircle className='text-danger'/>
            break;
    }

    return (
        icon
    );

};

export default IconStatus;

