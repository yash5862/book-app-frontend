import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import LoggerMiddleWare from "./middlewares/logger.middleware";
import MonitorReducerEnhancer from "./enhancers/monitorReducer";
import rootReducer from "./root.reducer";

export default function configureStore() {
  const middlewares = [LoggerMiddleWare, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers: any = [middlewareEnhancer, MonitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, {}, composedEnhancers);

  return store;
}
