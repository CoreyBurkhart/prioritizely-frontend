import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './sass/base/index.sass';
import './sass/tablet/index.sass';
import './sass/desktop/index.sass';

ReactDOM.render(React.createElement(App), window.document.getElementById('app'));
