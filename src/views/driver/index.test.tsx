import { fireEvent, screen } from "@testing-library/react";
import Driver from ".";
import {
  CODE,
  DRIVERS,
  FAMILY_NAME,
  NUMBER,
  SUMMARY,
} from "constant/TitleText";
import { renderWithProviders } from "utils/RenderWithProviders";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { driverList } from "constant/__mocks__/driver/DriverData";

const store = configureStore({
  reducer: {
    driverList: (
      state = {
        data: {
          MRData: {
            DriverTable: {
              Drivers: driverList,
            },
          },
        },
        isLoading: false,
      }
    ) => state,
  },
});

describe("Driver Component - Driver list", () => {
  beforeEach(() => {
    renderWithProviders(
      <Provider store={store}>
        <Driver />
      </Provider>
    );
  });

  test("render header - title text and search bar", () => {
    const titleText = screen.getByText(DRIVERS);
    expect(titleText).toBeInTheDocument();
    const searchBox = screen.getByRole("textbox", {
      name: /search/i,
    });
    expect(searchBox).toBeInTheDocument();
  });

  test("display the wikipedia link text", async () => {
    const wikipediaText = await screen.findAllByTestId("wikipedia_link");
    expect(wikipediaText[0]).toBeInTheDocument();
  });

  test("When click view icon open the summary modal", async () => {
    const viewIcon = await screen.findAllByTestId("view-icon");
    expect(viewIcon[0]).toBeInTheDocument();

    fireEvent.click(viewIcon[0]);

    const modalTitle = await screen.findByText(SUMMARY);
    expect(modalTitle).toBeInTheDocument();
  });

  test("renders driver card with data", async () => {
    // card titles & data
    const elements = await Promise.all([
      // title
      screen.findAllByText(/id/i),
      screen.findAllByText(NUMBER),
      screen.findAllByText(CODE),
      screen.findAllByText(FAMILY_NAME),
      // data
      screen.findAllByText("Lewis"),
      screen.findAllByText("British"),
    ]);

    elements.flat().forEach((el) => expect(el).toBeInTheDocument());
  });
});
