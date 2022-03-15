import { reduxType } from 'redux/redux.type';
import { createSelector } from 'reselect';

const pathnameInputSelector = (state: reduxType.stateType) =>
  state.router.location.pathname;

const pathnameSelector = createSelector(
  pathnameInputSelector,
  (inputValue) => inputValue,
);

export { pathnameSelector };
