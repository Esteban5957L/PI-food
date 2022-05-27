import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//midware que pasa a asincrona, frena las funciones asinvronan sun kojhnoias llegan a reudecere

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);