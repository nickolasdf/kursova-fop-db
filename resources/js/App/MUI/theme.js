import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffd63c",
            dark: "#ffd63c"
        },
        secondary: {
            main: "#ffd63c"
        }
    },
    overrides: {
        MuiDialog: {
            paper: {
                overflowY: "unset"
            },
            container: {
                height: "100vh",
                overflow: "auto"
            }
        }
    }
});
