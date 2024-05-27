import { XIcon } from "lucide-react";
import React from "react";

interface VideoPopupProps {
  videoName: string;
  videoKey: string;
  onClose: () => void;
}

export const VideoPopup: React.FunctionComponent<VideoPopupProps> = ({
  videoName,
  videoKey,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-3xl p-4">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white"
        >
          <XIcon className="w-6 h-6 text-slate-900 dark:text-slate-100" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {videoName}
        </h2>
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
