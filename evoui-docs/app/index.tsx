import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import globalReducer from 'redux/global/reducer';
import globalSaga from 'redux/global/sagas';
import App from './containers/App';

const reducers = {
  global: globalReducer,
};

const sagas = {
  global: globalSaga,
};

const store = configureStore(reducers, sagas, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  MOUNT_NODE,
);

export function dispatchDirectly(action: any) {
  store.dispatch(action);
}
