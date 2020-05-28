import React from "react";
import "./style.scss";

class DefaultModalControls extends React.Component {

    render() {

        return (
            <div className="modal-component__controls">
                {this.props.children}
            </div>
        )
    }
}

export default DefaultModalControls;
