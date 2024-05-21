import React from "react";
import { useGetTrendingMoviesWeekQuery } from "../store/";
export const HomePage: React.FC = () => {
  const { data, error, isLoading } = useGetTrendingMoviesWeekQuery({
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.results?.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
