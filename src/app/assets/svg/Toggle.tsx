import { ToggleProps } from '@/app/utils/interface';
import React from 'react';

const Toggle: React.FC<ToggleProps> = ({ isToggled, size }) => {
    const rotationStyle = {
        transform: isToggled ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s'
    };

    return (
        <svg width={size} height={size} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={rotationStyle}>
            <path fill="#030303" d="M13.708 6.29A1.006 1.006 0 0 0 13 6H5.005A1 1 0 0 0 4.3 7.71l4 4a1.013 1.013 0 0 0 1.42 0l4-4a1.01 1.01 0 0 0-.013-1.42z" />
        </svg>
    );
};

export default Toggle;
