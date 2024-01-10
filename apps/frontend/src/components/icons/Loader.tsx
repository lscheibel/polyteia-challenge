import React from 'react';
import styles from './IconLoader.module.scss';
import cn from 'classnames';

// https://tabler.io/icons/icon/chart-line
const IconLoader = ({ spin, ...props }: React.SVGAttributes<SVGElement> & { spin?: boolean }) => {
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
      className={cn({ [styles.spin]: spin }, props.className)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
};

export default IconLoader;
