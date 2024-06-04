import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetVideosQuery,
} from "../store";
import InfoBanner from "../components/InfoBanner";
import { ICastCardProps } from "../components/CastCard";
import { VideoCard } from "../components/VideoCard";
import { VideoPopup } from "../components/VideoPop";
import { ListDownCastCard } from "../components/ListDownCastCard";
import { uniqueCrew } from "../utils/uniqueCrews";

interface IMovieDetailsProps {}

export const MovieDetails: React.FunctionComponent<IMovieDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [popupVideo, setPopupVideo] = React.useState<{
    key: string;
    name: string;
  } | null>(null);

  if (id === undefined) {
    navigate("/not-found");
    return null;
  }

  const { data, isLoading, error } = useGetMovieDetailsQuery({ id });
  const { data: movieCredits } = useGetMovieCreditsQuery({ id });
  const { data: videos } = useGetVideosQuery({ id, media_type: "movie" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleVideoClick = (videoKey: string, videoName: string) => {
    setPopupVideo({ key: videoKey, name: videoName });
  };

  const closePopup = () => {
    setPopupVideo(null);
  };

  return (
    data && (
      <>
        {popupVideo && (
          <VideoPopup
            videoKey={popupVideo.key}
            videoName={popupVideo.name}
            onClose={closePopup}
          />
        )}
        <div className={`overflow-hidden ${popupVideo ? "blur-sm" : ""}`}>
          <InfoBanner
            data={{
              title: data.title,
              poster_path: data.poster_path || "",
              backdrop_path: data.backdrop_path,
              vote_count: data.vote_count,
              runtime: data.runtime,
              status: data.status,
              release_date: data.release_date,
              vote_average: data.vote_average,
              overview: data.overview,
              genres: data.genres,
              tagline: data.tagline,
            }}
          />
        </div>
        {movieCredits?.cast && (
          <div className="mt-12 p-4">
            <ListDownCastCard
              list={movieCredits?.cast.map<ICastCardProps>((item) => ({
                id: item.id,
                heading: item.name,
                profile_path: item.profile_path,
                subHeading: item.character,
                redirect: "/person/details",
              }))}
            />
          </div>
        )}
        {movieCredits?.crew && (
          <div className="mt-12 p-4">
            <ListDownCastCard
              list={uniqueCrew(movieCredits?.crew).map<ICastCardProps>(
                (item) => ({
                  id: item.id,
                  heading: item.name,
                  profile_path: item.profile_path,
                  subHeading: item.job,
                  redirect: "/person/details",
                })
              )}
            />
          </div>
        )}
        {videos?.results && (
          <ul className="flex flex-row my-12 p-4 overflow-scroll w-full gap-4 sm:gap-2 lg:gap-4 xl:gap-6 ">
            {videos?.results
              .filter((item) => item.site === "YouTube")
              .map((item) => (
                <li
                  key={item?.id}
                  className="flex-none w-1 sm:w-1 md:w-1/2 lg:w-1/3 xl:w-1/4"
                  onClick={() => handleVideoClick(item.key, item.name)}
                >
                  <VideoCard
                    key={item?.key}
                    data={{ key: item.key, videoName: item.name }}
                    onClick={handleVideoClick}
                  />
                </li>
              ))}
          </ul>
        )}
      </>
    )
  );
};
export default MovieDetails;
