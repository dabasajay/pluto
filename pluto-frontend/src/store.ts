import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { compose } from 'redux';

const store = createStore(
	rootReducer,
	compose(
    applyMiddleware(ReduxThunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)	

export default store;