import React from 'react';

// https://tabler.io/icons/icon/chevron-down
const IconChevronDown = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
};

export default IconChevronDown;
