import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { driverApiEndPoint } from "constant/ApiEndPoint";
import { DriverListResponse, DriverState } from "interfaces/redux";
import { getResponse } from "utils/Response";

// Define async thunk
export const fetchDriverList = createAsyncThunk<DriverListResponse>(
  "fetchDriverList",
  async () => {
    const response = await getResponse({
      apiEndPoint: driverApiEndPoint.GET_DRIVER_LIST,
    });

    const structuredData = {
      MRData: {
        DriverTable: {
          Drivers: response.response.data.MRData.DriverTable.Drivers,
        },
      },
    };

    return structuredData;
  }
);

const driverSlice = createSlice({
  name: "driverList",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  } as DriverState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriverList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDriverList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDriverList.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default driverSlice.reducer;
