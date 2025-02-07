import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { driverApiEndPoint } from "constant/ApiEndPoint";
import { DriverDetailsState } from "interfaces/redux";
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
        (list: { DriverStandings: any[] }) => list.DriverStandings
      ).find((d: any) => d.Driver.driverId === driverId);
    return driverStanding || null;
  }
);

// Create the slice
const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriverDetails: (state, action) => {
      state.driverDetails = action.payload;
    },
    clearDriverDetails: (state) => {
      state.driverDetails = null;
      state.standings = null;
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
        state.error = action.error.message || "Failed to fetch standings";
        state.loading = false;
      });
  },
});

export const { setDriverDetails, clearDriverDetails } = driverSlice.actions;

export default driverSlice.reducer;
