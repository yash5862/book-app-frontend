import React, { useMemo } from "react";
import configureStore from "./store";
import Route from "./route";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
const App = () => {
  const store = configureStore();
  return (
    <>
      <CssBaseline />
      <Router>
        <Provider store={store}>
          <Route />
        </Provider>
      </Router>
    </>
  );
};

export default App;
