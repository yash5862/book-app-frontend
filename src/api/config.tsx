// let serviceUrl = process.env.REACT_APP_SERVICE_URL;
const BASE_URL = "http://localhost:8080";

export const API_URL = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    signup: `${BASE_URL}/auth/signup`,
  },
  books: {
    addBook: `${BASE_URL}/books/create_book`,
    allBooks: `${BASE_URL}/books/get_all_books`,
    updateBook: `${BASE_URL}/books/update_book`,
    deleteBook: `${BASE_URL}/books/remove_book`,
  },
};
