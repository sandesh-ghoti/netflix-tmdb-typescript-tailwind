import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTvShowCreditsQuery,
  useGetTVShowDetailsQuery,
  useGetVideosQuery,
} from "../store";
import InfoBanner from "../components/InfoBanner";
import { ICastCardProps } from "../components/CastCard";
import { VideoCard } from "../components/VideoCard";
import { VideoPopup } from "../components/VideoPop";
import { ListDownCastCard } from "../components/ListDownCastCard";
import { uniqueCrew } from "../utils/uniqueCrews";

interface ITvShowDetailsProps {}

export const TvShowDetails: React.FunctionComponent<
  ITvShowDetailsProps
> = () => {
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

  const { data, isLoading, error } = useGetTVShowDetailsQuery({ id });
  const { data: TvShowCredits } = useGetTvShowCreditsQuery({ id });
  const { data: videos } = useGetVideosQuery({ id, media_type: "tv" });

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
              backdrop_path: data.backdrop_path,
              title: data.name,
              overview: data.overview,
              release_date: data.first_air_date,
              vote_average: data.vote_average,
              vote_count: data.vote_count,
              genres: data.genres,
              poster_path: data.poster_path,
              status: data.status,
              tagline: data.tagline,
              runtime: data.episode_run_time[0],
            }}
          />
        </div>
        {TvShowCredits?.cast && TvShowCredits?.cast.length > 0 && (
          <div className="mt-12 p-4">
            <ListDownCastCard
              list={TvShowCredits?.cast.map<ICastCardProps>((item) => ({
                id: item.id,
                heading: item.name,
                profile_path: item.profile_path,
                subHeading: item.character,
                redirect: "/person/details",
              }))}
            />
          </div>
        )}
        {TvShowCredits?.crew && TvShowCredits?.crew.length > 0 && (
          <div className="mt-12 p-4">
            <ListDownCastCard
              list={uniqueCrew(TvShowCredits?.crew).map<ICastCardProps>(
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
        {videos?.results && videos?.results.length > 0 && (
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
export default TvShowDetails;
