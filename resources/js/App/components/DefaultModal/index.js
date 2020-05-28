import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "./style.scss";

class DefaultModal extends React.Component {

    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.closeForm}
                maxWidth={false}
            >
                <div className="modal-component___container">
                    <div className="modal-component__header">
                        {this.props.title}
                    </div>
                    <div className='modal-component__body_wrapper'>
                        {this.props.children}
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default DefaultModal;
