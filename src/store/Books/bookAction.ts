import { GET_ALL_BOOK, LOADING } from "./bookType";
import { API_URL } from "../../api/config";
import { apiClient } from "../../api/general";

export const getAllBook = (Data: any) => async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.books.allBooks}`,
      data: Data,
    })
      .then((response: any) => {
        dispatch({
          type: GET_ALL_BOOK,
          payload: response,
        });

        resolve(response);
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

export const createBook = (Data: any) => async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.books.addBook}`,
      data: Data,
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

export const updateBook = (Id: any, data: any) => async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "PUT",
      url: `${API_URL.books.updateBook}/${Id}`,
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

export const deleteBook = (Id: any) => async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "DELETE",
      url: `${API_URL.books.deleteBook}/${Id}`,
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
