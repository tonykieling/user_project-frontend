export const store = createStore(
  reducer,
  null,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // line above is just to allows to use the devtools
);