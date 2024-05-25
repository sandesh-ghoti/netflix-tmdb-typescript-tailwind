import * as React from "react";

interface StarsProps {
  percentage: number; // The rating as a percentage (0-100)
}

export const Star: React.FunctionComponent<StarsProps> = (props) => {
  // Ensure the percentage is within 0 to 100 range
  const percentage = Math.max(0, Math.min(100, Math.floor(props.percentage)));

  return (
    <div className="flex items-center">
      <svg
        className="w-6 h-6 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <defs>
          <linearGradient id="starGradient">
            <stop offset={`${percentage}%`} stopColor="currentColor" />
            <stop
              offset={`${percentage}%`}
              stopColor="text-gray-200 dark:text-gray-600"
              stopOpacity="1"
            />
          </linearGradient>
        </defs>
        <path
          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          fill="url(#starGradient)"
        />
      </svg>
    </div>
  );
};
