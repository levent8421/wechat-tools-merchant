import React from 'react';
import './App.less';
import history from './router/history';
import {routes} from './router/routers';
import {HashRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

function App() {
    return (
        <div className="App">
            <Router history={history}>
                {renderRoutes(routes)}
            </Router>
        </div>
    );
}

export default App;
