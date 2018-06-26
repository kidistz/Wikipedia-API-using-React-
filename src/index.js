import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import 'font-awesome/css/font-awesome.css';
import registerServiceWorker from './registerServiceWorker';




ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
