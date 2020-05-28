import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { closeAlert } from "../../reducers/App/actions";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const styles = {
    success: {
        backgroundColor: "#43A047"
    },
    error: {
        backgroundColor: "#e53935"
    },
    info: {
        backgroundColor: "#1E88E5"
    },
    warning: {
        backgroundColor: "#FDD835"
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: "24px"
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
};

class SnackBar extends React.Component {
    render() {
        const { classes, alert, closeAlert } = this.props;
        const Icon = variantIcon[alert.type];
        return (
            <React.Fragment>
                {alert.open ? (
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        open={alert.open}
                        autoHideDuration={2000}
                        onClose={closeAlert}
                    >
                        <SnackbarContent
                            className={classes[alert.type]}
                            aria-describedby="client-snackbar"
                            message={
                                <span
                                    id="client-snackbar"
                                    className={classes.message}
                                >
                                    <Icon
                                        className={clsx(
                                            classes.icon,
                                            classes.iconVariant
                                        )}
                                    />
                                    {alert.message}
                                </span>
                            }
                            action={[
                                <IconButton
                                    key={alert.message}
                                    color="inherit"
                                    onClick={closeAlert}
                                >
                                    <CloseIcon className={classes.icon} />
                                </IconButton>
                            ]}
                        />
                    </Snackbar>
                ) : null}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    closeAlert
};

const mapStateToProps = ({ App }) => ({
    alert: {
        type: App.alert.type,
        open: App.alert.open,
        message: App.alert.message
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SnackBar));
