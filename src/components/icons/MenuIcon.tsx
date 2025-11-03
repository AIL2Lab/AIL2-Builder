import { IconSvgProps } from "./type";

export const MenuIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-label="menu"
    width={size || width}
    height={size || height}
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7 1H17M1 8H17M1 15H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
