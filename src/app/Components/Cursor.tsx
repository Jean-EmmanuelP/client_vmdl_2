import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSection } from "../utils/Contextboard";
import Plus from "../assets/svg/Plus";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { menuOpen, bgIsBlackFondateur, bgIsBlackFooter, isHoveringExpertiseButton } =
    useSection();
  const [visible, setVisible] = useState<boolean>(false);
  const [clickable, setClickable] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const BORDER_THRESHOLD = 2;
  const SCREEN_WIDTH_THRESHOLD = 1000;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent): void => {
      requestAnimationFrame(() => {
        if (position.x !== event.clientX || position.y !== event.clientY) {
          setPosition({ x: event.clientX, y: event.clientY });
          setVisible(
            !(
              event.clientX <= BORDER_THRESHOLD ||
              event.clientX >= window.innerWidth - BORDER_THRESHOLD ||
              event.clientY <= BORDER_THRESHOLD ||
              event.clientY >= window.innerHeight - BORDER_THRESHOLD
            )
          );
        }
      });
    };

    const handleMouseEnter = (): void => {
      if (window.innerWidth > SCREEN_WIDTH_THRESHOLD) {
        setVisible(true);
      }
    };

    const handleMouseLeave = (): void => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [position]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIfClickable = (): void => {
      const elementUnderCursor = document.elementFromPoint(
        position.x,
        position.y
      );
      const isClickable =
        elementUnderCursor &&
        (elementUnderCursor.getAttribute("data-clickable") === "true" ||
          elementUnderCursor.closest(".box") ||
          elementUnderCursor.closest(".phoneNumber"));
      setClickable(!!isClickable);
    };

    checkIfClickable();
  }, [position]);
  const MappingBgColor = {
    conseil: "#ADD8E6",
    contentieux: "#9EC8DB",
    affaires: "#BFE0E9",
    none: "transparent",
  };
  const cursorStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: "fixed",
    width: `${isHoveringExpertiseButton !== "none" ? "80px" : "18px"}`,
    height: `${isHoveringExpertiseButton !== "none" ? "80px" : "18px"}`,
    border: `2px solid ${
      bgIsBlackFondateur || bgIsBlackFooter ||  menuOpen === true
        ? "#FFFFFF"
        : isHoveringExpertiseButton !== "none"
        ? `${MappingBgColor[isHoveringExpertiseButton]}`
        : "#1D1D1B"
    }`,
    borderRadius: "50%",
    transform: `translate(-50%, -50%) ${clickable ? "scale(1.5)" : "scale(1)"}`,
    pointerEvents: "none",
    zIndex: 2147483647,
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity:
      visible && windowWidth > SCREEN_WIDTH_THRESHOLD
        ? isHoveringExpertiseButton
          ? 0.8
          : 1
        : 0,
    transition:
      "opacity 0.2s, transform 0.2s, width 0.3s ease-in-out, height 0.3s ease-in-out, background .7s ease-in-out, border .7s ease-in-out",
    backgroundColor: `${MappingBgColor[isHoveringExpertiseButton]}`,
  };

  if (isHoveringExpertiseButton !== "none") {
    return ReactDOM.createPortal(
      <div style={cursorStyle}>
        {/* trouver comment bien mettre la croix au milieu */}
          <Plus />
      </div>,
      document.getElementById("cursor-root") as HTMLElement
    );
  } else {
    return <div className="circle" style={cursorStyle}></div>;
  }
};

export default CustomCursor;
