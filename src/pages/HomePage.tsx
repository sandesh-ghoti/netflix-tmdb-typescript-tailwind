import React from "react";
import {
  useGetTrendingMoviesWeekQuery,
  useGetTrendingTvsWeekQuery,
} from "../store/";
import { ItemCardList } from "../components/ItemCardList";
export const HomePage: React.FC = () => {
  const {
    data: trendingMovies,
    error: trendingMoviesError,
    isLoading: trendingMoviesLoading,
  } = useGetTrendingMoviesWeekQuery({
    page: 1,
  });
  const {
    data: trendingTv,
    error: trendingTvError,
    isLoading: trendingTvLoading,
  } = useGetTrendingTvsWeekQuery({
    page: 1,
  });

  if (trendingMoviesLoading) return <div>Loading...</div>;
  if (trendingMoviesError) return <div>Error loading data.</div>;

  return (
    <>
      {trendingMovies?.results && !trendingMoviesLoading && (
        <ItemCardList list={trendingMovies?.results} title="Trending Movies" />
      )}
      {trendingTv?.results && !trendingTvLoading && (
        <ItemCardList list={trendingTv?.results} title="Trending TV" />
      )}
    </>
  );
};
export default HomePage;
