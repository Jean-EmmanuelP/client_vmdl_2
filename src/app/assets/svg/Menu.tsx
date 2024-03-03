import * as React from "react";
const Menu = ({ toggleMenu }: any) => {
  // Définir le style de base pour la transition
  const baseStyle = {
    transition: "transform 0.3s ease",
    transformOrigin: "center",
  };

  // Définir les transformations de la barre supérieure pour l'icône de fermeture
  const topBarTransform = toggleMenu ? "translateX(4px) translateY(4px) rotate(-45deg)" : "";
  // Définir les transformations de la barre inférieure pour l'icône de fermeture
  const bottomBarTransform = toggleMenu ? "translateX(3px) translateY(-4px) rotate(45deg)" : "";


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        transform: "translate3d(0px, 0px, 0px)",
      }}
    >
      <defs>
        <clipPath id="__lottie_element_2">
          <rect width={16} height={16} x={0} y={0} />
        </clipPath>
      </defs>
      <g clipPath="url(#__lottie_element_2)">
        {/* Barre du bas */}
        <g
          transform="matrix(1,0,0,1,0,1.0000066757202148)"
          opacity={1}
          style={{
            ...baseStyle,
            transform: bottomBarTransform,
            transformOrigin: "center",
            display: "block",
          }}
        >
          <g opacity={1} transform="matrix(1,0,0,1,8,13)">
            <path
              fill="rgb(255,255,255)"
              fillOpacity={1}
              d=" M-8,1 C-8,1 8,1 8,1 C8,1 8,-1 8,-1 C8,-1 -8,-1 -8,-1 C-8,-1 -8,1 -8,1z"
            />
          </g>
        </g>
        {/* Barre du milieu */}
        <g
          transform="matrix(1,0,0,1,0,1.0000076293945312)"
          opacity={1}
          style={{
            ...baseStyle,
            opacity: toggleMenu ? 0 : 1,
            transformOrigin: "center",
            display: "block",
          }}
        >
          <g opacity={1} transform="matrix(1,0,0,1,8,7)">
            <path
              fill="rgb(255,255,255)"
              fillOpacity={1}
              d=" M-8,1.0010000467300415 C-8,1.0010000467300415 8,1.0010000467300415 8,1.0010000467300415 C8,1.0010000467300415 8,-1.0010000467300415 8,-1.0010000467300415 C8,-1.0010000467300415 -8,-1.0010000467300415 -8,-1.0010000467300415 C-8,-1.0010000467300415 -8,1.0010000467300415 -8,1.0010000467300415z"
            />
          </g>
        </g>
        {/* Barre du haut */}
        <g
          transform="matrix(1,0,0,1,0,1.0000059604644775)"
          opacity={1}
          style={{
            ...baseStyle,
            transform: topBarTransform,
            transformOrigin: "center",
            display: "block",
          }}
        >
          <g opacity={1} transform="matrix(1,0,0,1,8,1)">
            <path
              fill="rgb(255,255,255)"
              fillOpacity={1}
              d=" M-8.00100040435791,1.0010000467300415 C-8.00100040435791,1.0010000467300415 0.9990000128746033,1.0010000467300415 0.9990000128746033,1.0010000467300415 C0.9990000128746033,1.0010000467300415 0.9990000128746033,-1.0010000467300415 0.9990000128746033,-1.0010000467300415 C0.9990000128746033,-1.0010000467300415 -8.00100040435791,-1.0010000467300415 -8.00100040435791,-1.0010000467300415 C-8.00100040435791,-1.0010000467300415 -8.00100040435791,1.0010000467300415 -8.00100040435791,1.0010000467300415z M3.999000072479248,-0.9990000128746033 M3.999000072479248,1.0010000467300415 C3.999000072479248,1.0010000467300415 8.00100040435791,1.0010000467300415 8.00100040435791,1.0010000467300415 C8.00100040435791,1.0010000467300415 8.00100040435791,-1.0010000467300415 8.00100040435791,-1.0010000467300415 C8.00100040435791,-1.0010000467300415 3.999000072479248,-1.0010000467300415 3.999000072479248,-1.0010000467300415 C3.999000072479248,-1.0010000467300415 3.999000072479248,1.0010000467300415 3.999000072479248,1.0010000467300415z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default Menu;
