import Cookies from "js-cookie";
import { getCurrentUser } from ".";
import { mockUser } from "constant/__mocks__/utils/UtilsData";

describe("getCurrentUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return parsed user object when cookie exists", () => {
    jest
      .spyOn(Cookies, "get")
      .mockImplementation(() => JSON.stringify(mockUser));

    const result = getCurrentUser();
    expect(result).toEqual(mockUser);
  });

  test("should return null when cookie does not exist", () => {
    jest.spyOn(Cookies, "get").mockImplementation(() => null);

    const result = getCurrentUser();
    expect(result).toBeNull();
  });

  test("should return null when JSON parsing fails", () => {
    jest.spyOn(Cookies, "get").mockImplementation(() => "invalid JSON");

    const result = getCurrentUser();
    expect(result).toBeNull();
  });
});
