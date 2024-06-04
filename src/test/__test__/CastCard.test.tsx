import { screen } from "@testing-library/react";
import { CastCard } from "../../components/CastCard";
import { renderWithProviders } from "../../utils/test-utils";
import { creditList } from "../mocks/dummyMockData";
import { IMG_CONFIG } from "../../constants";
const data = {
  profile_path: creditList.cast[0].profile_path,
  heading: creditList.cast[0].name,
  subHeading: creditList.cast[0].character,
  redirect: `people/${creditList.cast[0].id}`,
  id: creditList.cast[0].id,
};
describe("CastCard", async () => {
  test("app renders correctly", async () => {
    const castCard = renderWithProviders(<CastCard {...data} />);
    expect(castCard.container).toBeTruthy();
    expect(castCard.container.querySelector("h1")?.textContent).toBe(
      data.heading
    );
    const card = castCard.container.querySelector("div") as HTMLDivElement;
    expect(card).toBeInTheDocument();
  });
  it("renders correctly with the provided data", async () => {
    renderWithProviders(<CastCard {...data} />);
    screen.debug();

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${IMG_CONFIG.secure_base_url}${IMG_CONFIG.profile_sizes[2]}${data.profile_path}`
    );

    const heading = screen.getByText(data.heading);
    expect(heading).toBeInTheDocument();

    const subHeading = screen.getByText(data.subHeading);
    expect(subHeading).toBeInTheDocument();
  });
});
