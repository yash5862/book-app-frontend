import authReducer from "./auth/authReducer";
import drawerReducer from "./drawer/drawerReducer";
import bookReducer from "./Books/bookReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  drawerData: drawerReducer,
  bookData: bookReducer,
});
