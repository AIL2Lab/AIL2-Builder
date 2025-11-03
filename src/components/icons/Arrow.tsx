import { IconSvgProps } from "./type";

export const ArrowIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-label="github"
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_886_1278)">
      <path
        d="M20.9578 4.04062C18.7641 1.56562 15.5719 0 12 0C5.37188 0 0 5.37188 0 12H3C3 7.02656 7.02656 3 12 3C14.7422 3 17.175 4.24219 18.8203 6.17813L15.9984 9H24V0.998437L20.9578 4.04062ZM12 21C9.25781 21 6.825 19.7578 5.17969 17.8219L8.00156 15H0V23.0016L3.04219 19.9594C5.23594 22.4344 8.43281 24 12 24C18.6281 24 24 18.6281 24 12H21C21 16.9734 16.9734 21 12 21Z"
        fill="#F8C700"
      />
    </g>
    <defs>
      <clipPath id="clip0_886_1278">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
