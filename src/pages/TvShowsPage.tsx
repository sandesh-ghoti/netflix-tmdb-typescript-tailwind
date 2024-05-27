import * as React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPopularTvsQuery,
  useGetAiringTodayTvsQuery,
  useGetOnTheAirTvsQuery,
  useGetTopRatedTvsQuery,
} from "../services/tmdbApi";
import { ItemCardList } from "../components/ItemCardList";

export const TvShowsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  let hook;
  switch (category) {
    case "popular":
      hook = useGetPopularTvsQuery;
      break;
    case "airing_today":
      hook = useGetAiringTodayTvsQuery;
      break;
    case "on_the_air":
      hook = useGetOnTheAirTvsQuery;
      break;
    case "top_rated":
      hook = useGetTopRatedTvsQuery;
      break;
    default:
      return <div>Invalid category</div>;
  }

  const { data, error, isLoading } = hook({ page: 1 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {category?.replace("_", " ").toUpperCase()} TV SHOWS
      </h1>
      {data?.results && <ItemCardList list={data.results} />}
    </div>
  );
};
export default TvShowsPage;
