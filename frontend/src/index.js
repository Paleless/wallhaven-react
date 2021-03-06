import ReactDOM from 'react-dom';
import 'styles/index.scss';
import 'basscss/css/basscss.min.css'
import Router from './router/index.js';
import withStore from './store/index.js'
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    withStore(Router),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();