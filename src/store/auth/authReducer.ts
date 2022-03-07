import { LOGIN_USER, MODE_HANDLER, LOADING } from "./authType";
import { defaultAxios } from "../../api/general";

const initialState = {
  token: localStorage.getItem("token") || "",
  data: null,
  loading: false,
  mode: localStorage.getItem("mode") || "dark",
};

if (initialState.token)
  defaultAxios.defaults.headers.common["Authorization"] =
    "Bearer " + initialState.token;

export default function auth(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      defaultAxios.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload.token;
      debugger;
      return {
        ...state,
        token: action.payload.token,
        data: action.payload.data,
      };
    case MODE_HANDLER:
      localStorage.setItem("mode", action.payload);
      return {
        ...state,
        mode: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
