import { ReverseArrowProps } from "@/app/utils/interface";
import React, { useState, useEffect } from "react";

const ReversedArrow = ({
  reversed = false,
  isGrey = false,
  lilArrow = false,
  ...props
}: ReverseArrowProps) => {
  const [arrowSize, setArrowSize] = useState(lilArrow ? "30" : "50");

  useEffect(() => {
    const checkWindowSize = () => {
      const size =
        window.innerWidth <= 768
          ? lilArrow
            ? "15"
            : "30"
          : lilArrow
          ? "30"
          : "50";
      setArrowSize(size);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => window.removeEventListener("resize", checkWindowSize);
  }, [lilArrow]);

  return (
    <svg
      height={arrowSize}
      width={arrowSize}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      enable-background="new 0 0 50 50"
    >
      <path
        fill={`${isGrey ? "#606060" : "#231F20"}`}
        d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15
          c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422
          C15.172,39.813,15.172,40.446,15.563,40.836z"
        transform="scale(-1, 1) translate(-50, 0)"
      />
    </svg>
  );
};

export default ReversedArrow;
