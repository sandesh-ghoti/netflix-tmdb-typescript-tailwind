import React, { memo } from "react";
import { Star } from "lucide-react";

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ComponentType<any>;
  variant?: "default" | "destructive" | "yellow";
}

const Ratings: React.FunctionComponent<RatingsProps> = memo(
  ({
    rating,
    totalStars = 5,
    size = 20,
    fill = true,
    Icon = Star,
    variant = "default",
    ...props
  }) => {
    const fullStars = Math.floor(rating);
    const partialStar =
      rating % 1 > 0 ? (
        <PartialStar
          fillPercentage={rating % 1}
          size={size}
          className={getStarClassName(variant, true)}
          Icon={Icon}
        />
      ) : null;

    return (
      <div className="flex items-center gap-1" {...props}>
        {[...Array(fullStars)].map((_, i) => (
          <Icon
            key={i}
            size={size}
            className={getStarClassName(variant, true)}
            fill={fill ? "currentColor" : "transparent"}
          />
        ))}
        {partialStar}
        {[...Array(totalStars - fullStars - (partialStar ? 1 : 0))].map(
          (_, i) => (
            <Icon
              key={i + fullStars + 1}
              size={size}
              className={getStarClassName(variant, false)}
              fill={"transparent"}
            />
          )
        )}
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {rating}
        </span>
      </div>
    );
  }
);

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ComponentType<any>;
}

const PartialStar: React.FunctionComponent<PartialStarProps> = ({
  fillPercentage,
  size,
  className,
  Icon,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      <Icon size={size} className={className} />
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        <Icon size={size} className={className} fill="currentColor" />
      </div>
    </div>
  );
};

const getStarClassName = (
  variant: "default" | "destructive" | "yellow",
  filled: boolean
): string => {
  const baseClass =
    variant === "default"
      ? "text-yellow-500"
      : variant === "destructive"
      ? "text-red-500"
      : "text-yellow-500";
  const variantClasses = {
    default: filled ? "text-yellow-500" : "text-gray-200",
    destructive: filled ? "text-red-500" : "text-red-200",
    yellow: filled ? "text-yellow-500" : "text-yellow-200",
  };
  return `${baseClass} ${variantClasses[variant]}`;
};

export { Ratings };
