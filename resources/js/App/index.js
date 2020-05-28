import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App/>
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
);


