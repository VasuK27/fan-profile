import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { driverApiEndPoint } from "constant/ApiEndPoint";
import { DriverDetailsState, DriverStanding } from "interfaces/redux";
import { getResponse } from "utils/Response";

// Initial state
const initialState: DriverDetailsState = {
  driverDetails: null,
  standings: null,
  loading: false,
  error: "",
};

// Async thunk to fetch standings data
export const fetchDriverStandings = createAsyncThunk(
  "driver/fetchStandings",
  async (driverId: string) => {
    const response = await getResponse({
      apiEndPoint: driverApiEndPoint.GET_DRIVER_DETAILS,
    });
    const driverStanding =
      response.response.data.MRData.StandingsTable.StandingsLists.flatMap(
        (list: { DriverStandings: DriverStanding[] }) => list.DriverStandings
      ).find((d: DriverStanding) => d.Driver.driverId === driverId);
    return driverStanding || null;
  }
);

// Create the slice
const driverSlice = createSlice({
  name: "driverDetails",
  initialState,
  reducers: {
    setDriverDetails: (state, action) => {
      state.driverDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverStandings.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDriverStandings.fulfilled, (state, action) => {
        state.loading = false;
        state.standings = action.payload;
      })
      .addCase(fetchDriverStandings.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setDriverDetails } = driverSlice.actions;

export default driverSlice.reducer;
