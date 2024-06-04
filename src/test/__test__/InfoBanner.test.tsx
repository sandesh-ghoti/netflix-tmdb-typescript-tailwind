import { getByTestId, render, screen } from "@testing-library/react";
import InfoBanner from "../../components/InfoBanner";
import { movieDetails } from "../mocks/dummyMockData";

const mockData = {
  backdrop_path: movieDetails.backdrop_path,
  poster_path: movieDetails.poster_path || "",
  title: movieDetails.title,
  release_date: movieDetails.release_date,
  tagline: movieDetails.tagline,
  vote_average: movieDetails.vote_average,
  vote_count: movieDetails.vote_count,
  genres: movieDetails.genres,
  runtime: movieDetails.runtime,
  status: movieDetails.status,
  overview: movieDetails.overview,
};

test("renders InfoBanner with data", () => {
  const banner = render(<InfoBanner data={mockData} />);

  // Check title
  expect(screen.getByText(new RegExp(mockData.title, "i"))).toBeInTheDocument();

  // Check tagline
  expect(screen.getByText(mockData.tagline)).toBeInTheDocument();

  // Check ratings
  expect(
    screen.getByText((mockData.vote_average / 2).toFixed(1))
  ).toBeInTheDocument();

  // Check genres
  const genreElements = getByTestId(banner.container, "genres");
  expect(genreElements).toBeInTheDocument();
  expect(
    genreElements.textContent?.includes(
      mockData.genres.map((genre) => genre.name).join(", ")
    )
  ).toBe(true);

  // Check runtime
  const runtimeElement = banner.getByTestId("runtime");
  expect(runtimeElement).toBeInTheDocument();
  expect(runtimeElement.textContent?.includes(mockData.runtime + "")).toBe(
    true
  );

  // Check status
  expect(screen.getByText(mockData.status)).toBeInTheDocument();

  // Check overview
  expect(screen.getByText(new RegExp(mockData.overview))).toBeInTheDocument();
});
