import Cookies from "js-cookie";
import { setCurrentUser } from ".";
import { mockUser } from "constant/__mocks__/utils/UtilsData";

describe("setCurrentUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should set cookie when user object is provided", () => {
    const setSpy = jest.spyOn(Cookies, "set");

    setCurrentUser(mockUser);
    expect(setSpy).toHaveBeenCalledWith(
      "current_user",
      JSON.stringify(mockUser)
    );
  });

  test("should remove cookie when user is null", () => {
    const removeSpy = jest.spyOn(Cookies, "remove");

    setCurrentUser(null);
    expect(removeSpy).toHaveBeenCalledWith("current_user");
  });
});
