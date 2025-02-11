import driverReducer, { fetchDriverStandings, setDriverDetails } from "./index";
import { DriverDetailsState, DriverStanding } from "interfaces/redux";
import { driverApiEndPoint } from "constant/ApiEndPoint";
import { getResponse } from "utils/Response";

// Mock getResponse function
jest.mock("utils/Response", () => ({
  getResponse: jest.fn(),
}));

describe("driverSlice", () => {
  let initialState: DriverDetailsState;

  beforeEach(() => {
    initialState = {
      driverDetails: null,
      standings: null,
      loading: false,
      error: "",
    };
  });

  test("should handle setDriverDetails", () => {
    const mockDriverDetails = { driverId: "hamilton", name: "Lewis Hamilton" };
    const nextState = driverReducer(
      initialState,
      setDriverDetails(mockDriverDetails)
    );

    expect(nextState.driverDetails).toEqual(mockDriverDetails);
  });

  test("should handle fetchDriverStandings.pending", () => {
    const nextState = driverReducer(initialState, {
      type: fetchDriverStandings.pending.type,
    });

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe("");
  });

  test("should handle fetchDriverStandings.fulfilled", () => {
    const mockStanding = {
      position: 1,
      points: 300,
      wins: 9,
      Driver: { driverId: "hamilton" },
    } as DriverStanding;

    const nextState = driverReducer(initialState, {
      type: fetchDriverStandings.fulfilled.type,
      payload: mockStanding,
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.standings).toEqual(mockStanding);
  });

  test("should handle fetchDriverStandings.rejected", () => {
    const nextState = driverReducer(initialState, {
      type: fetchDriverStandings.rejected.type,
      error: { message: "Failed to fetch standings" },
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Failed to fetch standings");
  });

  test("should fetch driver standings successfully", async () => {
    const mockResponse = {
      response: {
        data: {
          MRData: {
            StandingsTable: {
              StandingsLists: [
                {
                  DriverStandings: [
                    {
                      Driver: { driverId: "hamilton" },
                      position: 1,
                      points: 300,
                      wins: 9,
                    },
                  ],
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

    await fetchDriverStandings("hamilton")(dispatch, getState, undefined);

    expect(getResponse).toHaveBeenCalledWith({
      apiEndPoint: driverApiEndPoint.GET_DRIVER_DETAILS,
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchDriverStandings.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchDriverStandings.fulfilled.type,
        payload:
          mockResponse.response.data.MRData.StandingsTable.StandingsLists[0]
            .DriverStandings[0],
      })
    );
  });

  test("should handle fetch driver standings failure", async () => {
    (getResponse as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchDriverStandings("hamilton")(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchDriverStandings.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchDriverStandings.rejected.type })
    );
  });
});
