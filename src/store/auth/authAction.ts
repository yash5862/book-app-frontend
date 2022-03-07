import { LOGIN_USER, MODE_HANDLER, LOADING } from "./authType";

import { API_URL } from "../../api/config";
import { apiClient } from "../../api/general";
export const login = (data: any) => async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.auth.login}`,
      data,
    })
      .then((response: any) => {
        resolve(response);
        dispatch({
          type: LOGIN_USER,
          payload: {
            token: response.token,
            data: response.result,
          },
        });
        window.location.href = "/dashboard";
        // window.location.reload();
      })
      .catch((error: any) => {
        reject(error);
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  });
};

export const resgitser = (data: any) => async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.auth.signup}`,
      data,
    })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        reject(error);
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  });
};

export const modeHanlder = (data: any) => async (dispatch: any) => {
  dispatch({
    type: MODE_HANDLER,
    payload: data,
  });
};
