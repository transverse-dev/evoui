import { reduxType } from 'redux/redux.type';
import { createSelector } from 'reselect';

const themeInputSelector = (state: reduxType.stateType) => state.global.theme;

const themeSelector = createSelector(
  themeInputSelector,
  (inputValue) => inputValue,
);

export { themeSelector };
