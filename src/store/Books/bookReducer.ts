import { GET_ALL_BOOK, LOADING } from "./bookType";

const initialState: any = {
  count: "",
  books: [],
  loading: false,
};

export default function bookManagementReducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_ALL_BOOK:
      return {
        ...state,
        count: action.payload?.totalCount,
        books: action.payload?.data,
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
