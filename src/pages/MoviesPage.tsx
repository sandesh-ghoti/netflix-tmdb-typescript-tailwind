import * as React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetTopRatedMoviesQuery,
} from "../services/tmdbApi";
import { ItemCardList } from "../components/ItemCardList";

export const MoviesPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  let hook;
  switch (category) {
    case "popular":
      hook = useGetPopularMoviesQuery;
      break;
    case "now_playing":
      hook = useGetNowPlayingMoviesQuery;
      break;
    case "upcoming":
      hook = useGetUpcomingMoviesQuery;
      break;
    case "top_rated":
      hook = useGetTopRatedMoviesQuery;
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
        {category?.replace("_", " ").toUpperCase()} MOVIES
      </h1>
      {data?.results && <ItemCardList list={data.results} />}
    </div>
  );
};
export default MoviesPage;
