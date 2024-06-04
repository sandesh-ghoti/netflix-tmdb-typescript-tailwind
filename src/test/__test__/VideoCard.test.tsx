import { getByTestId, queryByAttribute, render } from "@testing-library/react";
import { VideoCard } from "../../components/VideoCard";
import { YT_THUMBNAIL_URL } from "../../constants";
import { videos } from "../mocks/dummyMockData";

const mockData = {
  key: videos.results[0].key,
  videoName: videos.results[0].name,
};

const mockOnClick = vi.fn();

test("renders VideoCard with data", () => {
  const { container } = render(
    <VideoCard data={mockData} onClick={mockOnClick} />
  );

  // Check background image
  const videoCard = getByTestId(container, "video-card");
  expect(videoCard).toHaveStyle({
    backgroundImage: `url(${
      YT_THUMBNAIL_URL + mockData.key + "/hqdefault.jpg"
    })`,
  });
  expect(
    queryByAttribute("data-testid", container, "play-icon")
  ).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
