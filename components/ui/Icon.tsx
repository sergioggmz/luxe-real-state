import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "" }: IconProps) {
  return (
    <span
      className={`material-icons select-none leading-none inline-block align-middle ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

