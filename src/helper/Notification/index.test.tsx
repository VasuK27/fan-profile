import { screen, waitFor } from "@testing-library/react";
import {
  successNotification,
  errorNotification,
  warningNotification,
} from "./index";
import userEvent from "@testing-library/user-event";

describe("Notification Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  test("should display a success notification", async () => {
    successNotification("Operation successful!");

    await waitFor(() => {
      expect(screen.getByText("Operation successful!")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Operation successful!")
      ).not.toBeInTheDocument();
    });
  });

  test("should display an error notification with default message", async () => {
    errorNotification("");

    await waitFor(() => {
      expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Something went wrong!")
      ).not.toBeInTheDocument();
    });
  });

  test("should display an error notification with a custom message", async () => {
    errorNotification("Failed to load data");

    await waitFor(() => {
      expect(screen.getByText("Failed to load data")).toBeInTheDocument();
    });
  });

  test("should display a warning notification", async () => {
    warningNotification("Warning: Check your inputs!");

    await waitFor(() => {
      expect(
        screen.getByText("Warning: Check your inputs!")
      ).toBeInTheDocument();
    });
  });
});
