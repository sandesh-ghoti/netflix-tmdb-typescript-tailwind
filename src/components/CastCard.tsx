import * as React from "react";
import { IMG_CONFIG } from "../constants";
import { useNavigate } from "react-router-dom";

export interface ICastCardProps {
  profile_path: string;
  heading: string;
  subHeading: string;
  redirect?: string | null;
  id: number | string;
}

export const CastCard: React.FunctionComponent<ICastCardProps> = (data) => {
  if (!data) return null;
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (data.redirect) {
      navigate(`${data.redirect}/${data.id}`);
    }
  };
  return (
    <div
      className=" flex flex-col w-full h-full justify-center overflow-hidden bg-slate-700 bg-opacity-25 rounded-lg shadow-md shadow-gray-700"
      onClick={handleRedirect}
    >
      <img
        src={`${IMG_CONFIG.secure_base_url}${IMG_CONFIG.profile_sizes[2]}${data.profile_path}`}
        alt={data?.heading}
        className="w-full h-4/5 object-cover"
      />
      <div className="w-full mx-auto my-auto py-2 flex flex-col justify-center items-center">
        <h1 className=" text-center text-sm font-semibold">{data?.heading}</h1>
        <div className="text-xs text-wrap text-center">{data?.subHeading}</div>
      </div>
    </div>
  );
};
