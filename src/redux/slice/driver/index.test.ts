import driverReducer, { fetchDriverList } from "./index";
import { DriverState } from "interfaces/redux";
import { driverApiEndPoint } from "constant/ApiEndPoint";
import { getResponse } from "utils/Response";

// Mock getResponse function
jest.mock("utils/Response", () => ({
  getResponse: jest.fn(),
}));

describe("driverSlice", () => {
  let initialState: DriverState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      data: [],
      error: "",
    };
  });

  test("should handle fetchDriverList.pending", () => {
    const nextState = driverReducer(initialState, {
      type: fetchDriverList.pending.type,
    });
    expect(nextState.isLoading).toBe(true);
  });

  test("should handle fetchDriverList.fulfilled", () => {
    const mockData = {
      MRData: {
        DriverTable: {
          Drivers: [
            {
              driverId: "hamilton",
              givenName: "Lewis",
              familyName: "Hamilton",
            },
          ],
        },
      },
    };
    const nextState = driverReducer(initialState, {
      type: fetchDriverList.fulfilled.type,
      payload: mockData,
    });

    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(mockData);
  });

  test("should handle fetchDriverList.rejected", () => {
    const nextState = driverReducer(initialState, {
      type: fetchDriverList.rejected.type,
    });
    expect(nextState.isLoading).toBe(false);
  });

  test("should fetch driver list successfully", async () => {
    const mockResponse = {
      response: {
        data: {
          MRData: {
            DriverTable: {
              Drivers: [
                {
                  driverId: "verstappen",
                  givenName: "Max",
                  familyName: "Verstappen",
                },
              ],
            },
          },
        },
      },
    };

    (getResponse as jest.Mock).mockResolvedValueOnce(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchDriverList()(dispatch, getState, undefined);

    expect(getResponse).toHaveBeenCalledWith({
      apiEndPoint: driverApiEndPoint.GET_DRIVER_LIST,
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchDriverList.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchDriverList.fulfilled.type,
        payload: mockResponse.response.data,
      })
    );
  });

  test("should handle fetch driver list failure", async () => {
    (getResponse as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchDriverList()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchDriverList.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchDriverList.rejected.type })
    );
  });
});
