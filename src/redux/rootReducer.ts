import { combineReducers } from "redux";
import driverSlice from "../redux/slice/driver";
import driverReducer from "../redux/slice/driverDetails";

// Combine all the reducers into one root reducer
const rootReducer = combineReducers({
  driverList: driverSlice,
  driverDetails: driverReducer,
});

export default rootReducer;
