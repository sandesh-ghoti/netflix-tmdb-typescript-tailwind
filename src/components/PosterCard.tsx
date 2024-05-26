import * as React from "react";
import { Ratings } from "./Ratings";
import { useNavigate } from "react-router-dom";
import { IMG_CONFIG } from "../constants";
import getSrcSet from "../utils/getSrcSet";
export interface CardProps {
  title: string;
  poster_path: string;
  vote_average?: number;
  id: number;
  media_type: string;
}
export const PosterCard: React.FC<CardProps> = (details: CardProps) => {
  const navigate = useNavigate();
  const onclick = () => {
    console.log(details);
    navigate(`/${details.media_type}/details/${details.id}`);
  };
  const srcSet = getSrcSet(details.poster_path, {
    base_url: IMG_CONFIG.secure_base_url,
    sizes: IMG_CONFIG.poster_sizes,
  });
  if (!details.poster_path) {
    return null;
  }
  return (
    <div
      className="w-full max-w-sm bg-white cursor-pointer dark:bg-gray-800 dark:border-gray-700"
      onClick={onclick}
    >
      <img
        className="border border-gray-200 rounded-lg shadow"
        src={IMG_CONFIG.secure_base_url + "w500/" + details.poster_path}
        srcSet={srcSet}
        sizes="(max-width: 600px) 500px, (max-width: 1200px) 780px, 500px"
        alt={details.title}
      />
      <div className="px-5 py-2 w-full h-full">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {details.title}
        </h5>
        {details.vote_average && (
          <div className="flex items-center mt-2.5 mb-5">
            <Ratings
              rating={parseFloat((details.vote_average / 2).toFixed(1))}
            />
          </div>
        )}
      </div>
    </div>
  );
};
