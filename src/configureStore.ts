import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createReducer from './reducers';
import { History } from 'history';
import createSagaMiddleware from '@redux-saga/core';

export default function configureStore(
  reducers: any,
  sagas: any,
  history: History,
) {
  let composeEnhancers = compose;

  // TODO: 임시로 주석처리(개발시 주석해제), process env 설정 필요
  // if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
  //   if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  //     composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
  //       {},
  //     );
  // }

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store: any = createStore(
    createReducer(reducers),
    composeEnhancers(...enhancers),
  );

  for (const saga of Object.values(sagas)) {
    sagaMiddleware.run(saga as any);
  }

  store.injectedReducers = reducers;
  store.injectedSagas = sagas;

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
