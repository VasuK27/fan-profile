import { screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import ConditionalContent from "./";
import { driverDummyData } from "constant/__mocks__/driver/DriverData";

const renderItem = (item: string) => <div key={item}>{item}</div>;

describe("ConditionalContent Component", () => {
  test("renders loading state when isLoading is true", () => {
    renderWithProviders(
      <ConditionalContent
        isLoading
        data={[]}
        noDataMessage="No data available"
        renderItem={() => null}
      />
    );
    const loading = screen.getByAltText("loading");
    expect(loading).toBeInTheDocument();
  });

  test("renders noDataMessage when data is empty", () => {
    renderWithProviders(
      <ConditionalContent
        isLoading={false}
        data={[]}
        noDataMessage="No data available"
        renderItem={() => null}
      />
    );
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("renders items when data is present", () => {
    renderWithProviders(
      <ConditionalContent
        isLoading={false}
        data={driverDummyData}
        noDataMessage="No data available"
        renderItem={renderItem}
      />
    );

    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Item 2/i)).toBeInTheDocument();
  });
});
