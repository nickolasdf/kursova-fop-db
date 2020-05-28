import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store"
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import { theme } from "./MUI/theme";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);


