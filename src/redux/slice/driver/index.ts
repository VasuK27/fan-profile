import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { driverApiEndPoint } from "constant/ApiEndPoint";
import { DriverState } from "interfaces/redux";
import { getResponse } from "utils/Response";

// Initial state
const initialState: DriverState = {
  isLoading: false,
  data: [],
  error: "",
};

// Async thunk to fetch standings data
export const fetchDriverList = createAsyncThunk(
  "fetchDriverList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getResponse({
        apiEndPoint: driverApiEndPoint.GET_DRIVER_LIST,
      });

      return response.response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch driver data");
    }
  }
);

const driverSlice = createSlice({
  name: "driverList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverList.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchDriverList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDriverList.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to fetch driver";
        state.isLoading = false;
      });
  },
});

export default driverSlice.reducer;
