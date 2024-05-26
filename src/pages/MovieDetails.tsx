import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../store";
import InfoBanner from "../components/InfoBanner";

interface IMovieDetailsProps {}

const MovieDetails: React.FunctionComponent<IMovieDetailsProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (id === undefined) {
    navigate("/not-found");
    return null;
  }
  const { data, isLoading, error } = useGetMovieDetailsQuery({ id });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    data && (
      <div className="overflow-hidden">
        <InfoBanner data={data} />
      </div>
    )
  );
};

export default MovieDetails;
