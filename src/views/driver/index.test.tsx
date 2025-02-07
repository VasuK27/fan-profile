import { fireEvent, screen } from "@testing-library/react";
import Driver from ".";
import { CODE, DRIVERS, NUMBER, SUMMARY } from "constant/TitleText";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("Driver Component - Driver list", () => {
  beforeEach(() => {
    renderWithProviders(<Driver />);
  });
  test("render header - title text and search bar", () => {
    const titleText = screen.getByText(DRIVERS);
    expect(titleText).toBeInTheDocument();
    const searchBox = screen.getByRole("textbox", {
      name: /search/i,
    });
    expect(searchBox).toBeInTheDocument();
  });

  test("when click wikipedia redirect wikipedia web", async () => {
    const wikipediaText = await screen.findAllByTestId("WikipediaLink");
    expect(wikipediaText[0]).toBeInTheDocument();

    fireEvent.click(wikipediaText[0]);
    const titleText = screen.queryByTestId("WikipediaLink");
    expect(titleText).not.toBeInTheDocument();
  });

  test("When click view icon open the summary modal", async () => {
    const viewIcon = await screen.findAllByTestId("VisibilityOutlinedIcon");
    expect(viewIcon[0]).toBeInTheDocument();

    fireEvent.click(viewIcon[0]);

    const modalTitle = await screen.findByText(SUMMARY);
    expect(modalTitle).toBeInTheDocument();
  });

  test("renders driver card with data", async () => {
    const Id = await screen.findAllByText(/id/i);
    const Number = await screen.findAllByText(NUMBER);
    const Code = await screen.findAllByText(CODE);

    expect(Id[0]).toBeInTheDocument();
    expect(Number[0]).toBeInTheDocument();
    expect(Code[0]).toBeInTheDocument();
  });
});
