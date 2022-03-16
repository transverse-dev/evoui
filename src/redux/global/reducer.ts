import produce from 'immer';
import { SET_THEME } from 'redux/constants';
import { globalType } from './global.type';

const initialState: globalType.stateType = {
  theme: localStorage.getItem('theme') !== 'dark' ? 'light' : 'dark',
};

export default function globalReducer(state = initialState, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_THEME:
        draft.theme = action.payload;
        break;
    }
  });
}
