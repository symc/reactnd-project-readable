import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware,compose } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
);

ReactDOM.render(
<Provider store = {store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>, document.getElementById('root')
);
registerServiceWorker();
