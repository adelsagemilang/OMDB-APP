import { rootReducer as createRootReducer } from 'store/rootReducer';
import { devMiddlewares } from 'store/middlewares/devMiddlewares';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Store, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { ApplicationState } from 'store/rootState';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'store/rootSaga';
import { History } from 'history';

export default function configureStore(
  history: History,
): Store<ApplicationState> {
  // Put enhancers here (composed with devtools)
  const composeEnhancers = composeWithDevTools({});

  // Saga Middlewares
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        ...devMiddlewares,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
