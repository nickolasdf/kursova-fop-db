import React from "react";
import Dialog from '@material-ui/core/Dialog';
import "./style.scss";

class DefaultConfirmModal extends React.Component {

    render() {

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.closeModalCallback}
                maxWidth={false}
            >
                <div className="modal-component___container">
                    <div className="modal-component__header">
                        {this.props.title}
                    </div>
                    <div className='modal-component__body_wrapper'>
                        <div className="modal-component__body">
                            {this.props.confirmInfoText}
                        </div>
                        <div className="modal-component__controls">
                            <button type="button" className="action_btn primary" onClick={this.props.confirnCallback}>{this.props.confirmBtnText}</button>
                            <button type="button" className="action_btn" onClick={this.props.closeModalCallback}>{this.props.canselBtnText}</button>
                        </div>
                    </div>
                </div>

            </Dialog>
        )
    }
}

export default DefaultConfirmModal;
