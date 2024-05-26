import * as React from "react";
import { useParams } from "react-router-dom";

interface IMovieDetailsProps {}

const MovieDetails: React.FunctionComponent<IMovieDetailsProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  console.log("id", id);
  return <></>;
};

export default MovieDetails;
