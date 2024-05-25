import * as React from "react";
import { Movie, Person, TV } from "tmdb-ts";
import { PosterCard } from "./PosterCard";
interface CardProps {
  list: Movie[] | TV[] | Person[];
  title: string;
}

export const ItemCardList: React.FunctionComponent<CardProps> = (props) => {
  return (
    <section className="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="my-4 font-bold text-4xl text-center text-black dark:text-white">
        {props.title}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {props.list.map((item) => (
          <li key={item.id}>
            {isMovie(item) ? (
              <PosterCard
                id={item.id}
                poster_path={item.poster_path}
                media_type="movie"
                title={item.title}
                vote_average={item.vote_average}
              />
            ) : isTV(item) ? (
              <PosterCard
                id={item.id}
                poster_path={item.poster_path}
                media_type="tv"
                title={item.name} // TV shows use the 'name' property instead of 'title'
                vote_average={item.vote_average}
              />
            ) : (
              <PosterCard
                id={item.id}
                poster_path={item.profile_path}
                media_type="person"
                title={item.name}
                vote_average={item.popularity}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export function isMovie(item: Movie | TV | Person): item is Movie {
  return (item as Movie).title !== undefined;
}

export function isTV(item: Movie | TV | Person): item is TV {
  return (item as TV).name !== undefined;
}

export function isPerson(item: Movie | TV | Person): item is Person {
  return (item as Person).name !== undefined;
}
