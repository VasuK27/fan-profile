import { combineReducers } from "redux";
import driverSlice from "../redux/slice/driver";
import driverDetailsSlice from "../redux/slice/driverDetails";

// Combine all the reducers into one root reducer
const rootReducer = combineReducers({
  driverList: driverSlice,
  driverDetails: driverDetailsSlice,
});

export default rootReducer;
