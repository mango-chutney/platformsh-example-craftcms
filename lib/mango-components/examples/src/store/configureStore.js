import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

const logger = createLogger();

export default () => createStore(createRootReducer(), applyMiddleware(logger));
