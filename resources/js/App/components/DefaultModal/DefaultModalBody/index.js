import React from "react";
import "./style.scss";

class DefaultModalBody extends React.Component {

    render() {

        return (
            <div className="modal-component__body">
                {this.props.children}
            </div>
        )
    }
}

export default DefaultModalBody;
