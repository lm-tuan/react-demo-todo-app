import { createStore, applyMiddleware, compose } from 'redux';
import myReducer from './../reducers';
import { rootSaga} from './../sagas'
import createSagaMiddleware from 'redux-saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    myReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(rootSaga);
export default store;
