import React from "react";
import "./style.scss";

class DefaultTooltip extends React.Component {

    render() {

        const { message = "Ошибка"} = this.props;

        return (
            <div className="input-validate-error">{message}</div>
        )
    }
}

export default DefaultTooltip;
