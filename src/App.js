import React from 'react';
import './App.less';
import {routes} from './router/routers';
import {HashRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import store from './store';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    {renderRoutes(routes)}
                </Router>
            </Provider>
        </div>
    );
}

export default App;
