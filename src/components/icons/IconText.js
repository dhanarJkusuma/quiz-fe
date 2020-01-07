import React from "react";

const IconText = ({ size = 24, color }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"
        fill={color}
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

export default IconText;
