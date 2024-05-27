import { YT_THUMBNAIL_URL } from "../constants";
import { PlayCircle } from "lucide-react";
import React from "react";

interface IVideoCardProps {
  data: {
    key: string;
    videoName: string;
  };
  onClick: (key: string, videoName: string) => void;
}

export const VideoCard: React.FC<IVideoCardProps> = ({ data, onClick }) => {
  return (
    data?.key && (
      <div
        className="w-full aspect-video ring-2 rounded-md shadow-sm shadow-stone-400 flex justify-center items-center cursor-pointer"
        style={{
          backgroundImage: `url(${
            YT_THUMBNAIL_URL + data.key + "/hqdefault.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => onClick(data.key, data.videoName)}
      >
        <div className="rounded-full bg-slate-800 bg-opacity-30">
          <PlayCircle className="text-3xl m-2" />
        </div>
      </div>
    )
  );
};
