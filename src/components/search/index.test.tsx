import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "utils/RenderWithProviders";
import Search from ".";
import { useState } from "react";

const handleSearchOnChange = jest.fn();
function getSearchbox(): HTMLElement {
  return screen.getByPlaceholderText("Search");
}

const defaultProps = {
  searchValue: "",
  handleSearchOnChange: () => {},
  disabled: false,
};
describe("Search component", () => {
  beforeEach(() => {
    renderWithProviders(<Search {...defaultProps} />);
  });
  test("should render the Search component with initial props", () => {
    expect(getSearchbox()).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });
});

describe("Search component - with default props", () => {
  beforeEach(() => {
    renderWithProviders(
      <Search {...defaultProps} searchValue="Search Value" />
    );
  });
  test("check the search value", () => {
    expect(getSearchbox()).toHaveValue("Search Value");
  });
});

describe("Search component - with searchValue and handleSearchOnChange", () => {
  test("Check new search value when search input value change", () => {
    const TestWrapper = () => {
      const [searchValue, setSearchValue] = useState("");
      return (
        <Search
          {...defaultProps}
          searchValue={searchValue}
          handleSearchOnChange={(e) => {
            setSearchValue(e.target.value);
            handleSearchOnChange(e);
          }}
        />
      );
    };
    renderWithProviders(<TestWrapper />);
    const searchBox = getSearchbox();
    fireEvent.change(searchBox, { target: { value: "search" } });
    expect(handleSearchOnChange).toHaveBeenCalledTimes(1);
    expect(searchBox).toHaveValue("search");
  });
});

describe("Search component - with disabled true value", () => {
  beforeEach(() => {
    renderWithProviders(<Search {...defaultProps} disabled />);
  });
  test("should disable the search input when disabled prop is true", () => {
    expect(getSearchbox()).toBeDisabled();
  });
});
