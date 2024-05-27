import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetPopularPeopleQuery } from "../services/tmdbApi";
import { ItemCardList } from "../components/ItemCardList";

export const PersonPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  console.log("person page", category);
  let hook;
  switch (category) {
    case "popular":
      hook = useGetPopularPeopleQuery;
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
        {category?.replace("_", " ").toUpperCase()} PEOPLES
      </h1>
      {data?.results && <ItemCardList list={data.results} />}
    </div>
  );
};
export default PersonPage;
