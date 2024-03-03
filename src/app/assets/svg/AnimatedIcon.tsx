import * as React from "react";

const AnimatedIcon = ({ toggleMenu }: any) => {
  // Définir le style de base pour la transition
  const baseStyle = {
    transition: "transform 0.3s ease",
  };

  // Définir les transformations de la barre supérieure pour l'icône de fermeture
  const topBarTransform = toggleMenu ? "translateY(3px) rotate(45deg)" : "";
  // Définir les transformations de la barre inférieure pour l'icône de fermeture
  const bottomBarTransform = toggleMenu
    ? "translateY(-5.5px) rotate(-45deg)"
    : "";

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
      }}
    >
      {/* Barre supérieure qui devient une partie de la croix */}
      <path
        fill="rgb(255,255,255)"
        style={{
          ...baseStyle,
          transform: topBarTransform,
          transformOrigin: "center",
        }}
        d="M0 2 H16 V3 H0z"
      />
      {/* Barre du milieu qui disparaît pour l'icône de fermeture */}
      <path
        fill="rgb(255,255,255)"
        style={{
          ...baseStyle,
          opacity: toggleMenu ? 0 : 1,
          transformOrigin: "center",
        }}
        d="M0 7 H16 V8 H0z"
      />
      {/* Barre inférieure qui devient l'autre partie de la croix */}
      <path
        fill="rgb(255,255,255)"
        style={{
          ...baseStyle,
          transform: bottomBarTransform,
          transformOrigin: "center",
        }}
        d="M0 12 H16 V13 H0z"
      />
    </svg>
  );
};

export default AnimatedIcon;
