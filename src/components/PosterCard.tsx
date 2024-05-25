import * as React from "react";
import { Star } from "./Stars";
import { useNavigate } from "react-router-dom";
import { IMG_CONFIG } from "../constants";
import getSrcSet from "../utils/getSrcSet";
export interface CardProps {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
  media_type: string;
}
export const PosterCard: React.FC<CardProps> = (details: CardProps) => {
  const navigate = useNavigate();
  const onclick = () => {
    console.log(details);
    navigate(`/${details.media_type}/${details.id}`);
  };
  const srcSet = getSrcSet(details.poster_path, {
    base_url: IMG_CONFIG.secure_base_url,
    sizes: IMG_CONFIG.poster_sizes,
  });
  return (
    <div
      className="w-full max-w-sm bg-white cursor-pointer dark:bg-gray-800 dark:border-gray-700"
      onClick={onclick}
    >
      <a href="#">
        <img
          className="border border-gray-200 rounded-lg shadow"
          src={IMG_CONFIG.secure_base_url + "w500/" + details.poster_path}
          srcSet={srcSet}
          sizes="(max-width: 600px) 500px, (max-width: 1200px) 780px, 500px"
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {details.title}
          </h5>
        </a>
        {details.vote_average && (
          <div className="flex items-center mt-2.5 mb-5">
            <Star percentage={details.vote_average * 10} />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {parseFloat(details.vote_average.toFixed(1))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
