import { getRequest } from "helper/AxiosClient";
import { errorNotification } from "helper/Notification";
import { SOMETHING_WENT_WRONG } from "constant/ErrorMessages";
import { getResponse } from ".";

jest.mock("helper/AxiosClient", () => ({
  getRequest: jest.fn(),
}));

jest.mock("helper/Notification", () => ({
  errorNotification: jest.fn(),
}));

describe("getResponse", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return response data when API call is successful", async () => {
    const mockResponse = { type: 1, response: { data: "Success" } };

    // Explicitly cast `getRequest` as Jest mock function
    (getRequest as jest.Mock).mockResolvedValue(mockResponse);

    const params = {
      apiEndPoint: "https://api.example.com/data",
      queryString: "param1=value1",
      navigate: jest.fn(),
    };

    const result = await getResponse(params);
    expect(getRequest).toHaveBeenCalledWith(
      "https://api.example.com/data?param1=value1",
      {},
      params.navigate
    );
    expect(result).toEqual(mockResponse);
  });

  test("should call errorNotification and throw error when API call fails", async () => {
    const mockError = new Error("Network Error");

    // Explicitly cast `getRequest` as Jest mock function
    (getRequest as jest.Mock).mockRejectedValue(mockError);

    const params = {
      apiEndPoint: "https://api.example.com/data",
      queryString: "",
      navigate: jest.fn(),
    };

    await expect(getResponse(params)).rejects.toThrow("Network Error");
    expect(errorNotification).toHaveBeenCalledWith(SOMETHING_WENT_WRONG);
  });
});
