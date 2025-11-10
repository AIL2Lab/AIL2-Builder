import { IconSvgProps } from "./type";

export const EthereumIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-label="ethereum"
    width={size || width}
    height={size || height}
    viewBox="0 0  32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fillRule="nonzero">
      <path  fillOpacity=".6" d="M16.498 4v8.87l7.497 3.35z" />
      <path d="M16.498 4L9 16.22l7.498-3.35z" />
      <path fillOpacity=".6" d="M16.498 21.968v6.028L24 17.616z" />
      <path fillOpacity=".6" d="M16.498 27.996v-6.028l-7.497-4.352z" />
      <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
      <path fillOpacity=".6" d="M9 16.22l7.498 4.353v-7.701z" />
    </g>
  </svg>
);
