import React from "react";
import "./style.scss";
import Dialog from "@material-ui/core/Dialog/Dialog";

class DialogWrapper extends React.Component {

    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.closeForm}
                maxWidth={false}
            >
                {this.props.children}
            </Dialog>
        )
    }
}

export default DialogWrapper;
