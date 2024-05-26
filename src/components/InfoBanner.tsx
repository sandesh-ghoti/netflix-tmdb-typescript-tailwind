import * as React from "react";
import { MovieDetails } from "tmdb-ts";
import { IMG_CONFIG } from "../constants";
import { Ratings } from "./Ratings";

interface IInfoBannerProps {
  data: MovieDetails;
}

const InfoBanner: React.FunctionComponent<IInfoBannerProps> = ({ data }) => {
  return (
    <section
      style={
        data?.backdrop_path
          ? {
              width: "100%",
              height: "100%",
              backgroundImage: `url(${IMG_CONFIG.secure_base_url}${IMG_CONFIG.backdrop_sizes[3]}${data?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : { backgroundColor: "bg-slate-800" }
      }
    >
      <div
        className={
          " w-full h-full mx-auto bg-slate-900 bg-opacity-70 grid grid-cols-3 xl:grid-cols-4 gap-4 items-center overflow-hidden p-8 mt-6"
        }
      >
        <img
          src={`${IMG_CONFIG.secure_base_url}${IMG_CONFIG.poster_sizes[4]}${data?.poster_path}`}
          alt={`${data?.title}`}
          className=" col-span-1 rounded-md shadow-md shadow-slate-400 my-auto"
        />
        <div className="col-span-2 xl:col-span-3 my-auto flex flex-col">
          <h1 className="text-xl font-bold text-slate-100 my-2 md:text-2xl lg:text-3xl">
            {data?.title}
            {" ("}
            {data.release_date.split("-")[0]}
            {")"}
          </h1>
          <span className="text-sm mb-4 font-serif italic">
            {data?.tagline}
          </span>
          <div className="my-1">
            <Ratings rating={parseFloat((data?.vote_average / 2).toFixed(1))} />
          </div>
          <div className="flex flex-row flex-wrap gap-2 max-md:text-sm max-md:gap-1 my-1">
            <h4 className="font-bold text-slate-100">Total Votes</h4>:{" "}
            <span>{data?.vote_count}</span>
          </div>
          <div className="flex flex-row flex-wrap gap-2 max-md:text-sm max-md:gap-1 my-1">
            <h4 className="font-bold text-slate-100">Geners</h4>:{" "}
            <span>{data.genres.map((genre) => genre.name).join(", ")}</span>
          </div>
          <div className="flex flex-row flex-wrap gap-2 max-md:text-sm max-md:gap-1 my-1">
            <h4 className="font-bold text-slate-100">Runtime</h4>:{" "}
            <span>{data?.runtime} minutes</span>
          </div>
          <div className="flex flex-row flex-wrap gap-2 max-md:text-sm max-md:gap-1 my-1">
            <h4 className="font-bold text-slate-100">Release Date</h4>:{" "}
            <span>{data?.release_date}</span>
          </div>
          <div className="flex flex-row flex-wrap gap-2 max-md:text-sm max-md:gap-1 my-1">
            <h4 className="font-bold text-slate-100">Status</h4>:{" "}
            <span>{data?.status}</span>
          </div>
          <p className="text-sm text-zinc-200 my-2">{data?.overview}</p>
        </div>
      </div>
    </section>
  );
};

export default InfoBanner;
