import React, { useState, useEffect } from 'react';
import { useSection } from '../utils/Contextboard';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { bgIsBlackFondateur, bgIsBlackFooter, setBgIsBlackFooter, setBgIsBlackFondateur } = useSection();
    const [visible, setVisible] = useState(false);
    const [clickable, setClickable] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        console.log(`this is the bgIsBlack value: ${bgIsBlackFondateur}`)
    }, [bgIsBlackFondateur]);

    const BORDER_THRESHOLD = 2;
    const SCREEN_WIDTH_THRESHOLD = 1000;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            requestAnimationFrame(() => {
                if (position.x !== event.clientX || position.y !== event.clientY) {
                    setPosition({ x: event.clientX, y: event.clientY });
                    setVisible(!(event.clientX <= BORDER_THRESHOLD || event.clientX >= window.innerWidth - BORDER_THRESHOLD || event.clientY <= BORDER_THRESHOLD || event.clientY >= window.innerHeight - BORDER_THRESHOLD));
                }
            });
        };

        const handleMouseEnter = () => {
            if (window.innerWidth > SCREEN_WIDTH_THRESHOLD) {
                setVisible(true);
            }
        };
        const handleMouseLeave = () => {
            setVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [position]);

    useEffect(() => {
        const checkIfClickable = () => {
            const elementUnderCursor = document.elementFromPoint(position.x, position.y);
            const isClickable = elementUnderCursor && (
                elementUnderCursor.getAttribute("data-clickable") === "true" ||
                elementUnderCursor.closest(".box") ||
                elementUnderCursor.closest(".phoneNumber")
            );
            setClickable(!!isClickable);
        };

        checkIfClickable();
    }, [position]);

    const cursorStyle: React.CSSProperties = {
        position: 'fixed',
        width: '18px',
        height: '18px',
        border: `2px solid ${bgIsBlackFondateur || bgIsBlackFooter ? '#FFFFFF' : '#1D1D1B'}`,
        borderRadius: '50%',
        transform: `translate(-50%, -50%) ${clickable ? 'scale(1.5)' : 'scale(1)'}`,
        pointerEvents: 'none',
        zIndex: 1000,
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: visible && windowWidth > SCREEN_WIDTH_THRESHOLD ? 1 : 0,
        transition: 'opacity 0.2s, transform 0.2s',
    };

    return (
        <div className="circle" style={cursorStyle}></div>
    );
};


// tout fonctionne bien sauf quand tu decide de partir vite de la page, le cursor reste a opacity 1 alors que je veux que ce soit opacity 0
export default CustomCursor;
