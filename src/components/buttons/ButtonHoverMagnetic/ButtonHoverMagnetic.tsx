"use client";

import React from "react";
import useMagneticEffect from "./useMagneticEffect";

interface ButtonHoverMagneticProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  strengthFactor?: number;
}

const ButtonHoverMagnetic = ({
  text = "Button",
  onClick,
  className = "",
  strengthFactor = 20,
}: ButtonHoverMagneticProps) => {
  const magneticRef = useMagneticEffect(strengthFactor);

  return (
    <button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`relative cursor-pointer h-9 bg-white shadow rounded px-4 text-sm ${className}`}
    >
      {text}
    </button>
  );
};

ButtonHoverMagnetic.displayName = "ButtonHoverMagnetic";

export default React.memo(ButtonHoverMagnetic);
