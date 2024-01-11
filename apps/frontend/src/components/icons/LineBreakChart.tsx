import React from 'react';

const IconLineBreakChart = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5H5a1 1 0 0 1-1-1v-4ZM16 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3V5ZM8 16h4v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3ZM12 9a1 1 0 0 1 1-1h3v7a1 1 0 0 1-1 1h-3V9Z" />
    </svg>
  );
};

export default IconLineBreakChart;
