import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer, composedEnhancers } from "../redux/store";

const render = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, composedEnhancers),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { render };
