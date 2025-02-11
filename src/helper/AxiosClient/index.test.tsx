import MockAdapter from "axios-mock-adapter";
import { loginRoute } from "constant/RoutesEndPoint";
import { errorNotification } from "helper/Notification";
import { axiosClient, getRequest } from ".";

jest.mock("helper/Notification");

describe("axiosClient API Tests", () => {
  let mock: MockAdapter;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    mock = new MockAdapter(axiosClient);
    navigateMock = jest.fn();
  });

  afterEach(() => {
    mock.reset();
  });

  test("should return data when API call is successful", async () => {
    const mockData = { message: "Success" };
    mock.onGet("/test-endpoint").reply(200, mockData);

    const response = await getRequest("test-endpoint", {}, navigateMock);

    expect(response.type).toBe(1);
    expect(response.response?.data).toEqual(mockData);
  });

  test("should handle 401 unauthorized response", async () => {
    mock.onGet("/test-endpoint").reply(401);

    const response = await getRequest("test-endpoint", {}, navigateMock);

    expect(response.type).toBe(0);
    expect(navigateMock).toHaveBeenCalledWith(loginRoute.LOGIN_ROUTE);
  });

  test("should handle other API errors", async () => {
    mock.onGet("/test-endpoint").reply(500, { error: "Server error" });

    const response = await getRequest("test-endpoint", {}, navigateMock);

    expect(response.type).toBe(0);
    expect(response.errormessage).toEqual({ error: "Server error" });
  });

  test("should call errorNotification on network error", async () => {
    mock.onGet("/test-endpoint").networkError();

    await getRequest("test-endpoint", {}, navigateMock);

    expect(errorNotification).toHaveBeenCalled();
  });
});
