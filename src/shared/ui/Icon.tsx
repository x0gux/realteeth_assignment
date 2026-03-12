interface StarIconProps {
  className?: string;
  filled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const StarIcon = ({ className = '', filled = true, onClick }: StarIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <path
      d="M10 2L12.472 7.008L18 7.813L14 11.713L14.944 17.218L10 14.618L5.056 17.218L6 11.713L2 7.813L7.528 7.008L10 2Z"
      fill={filled ? "#FFE600" : "#E2E2E2"}
    />
  </svg>
);
