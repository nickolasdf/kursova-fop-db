import React from "react";
import "./style.scss";

const Content = props => (
    <main className="main">
        <div className="main-container">{props.children}</div>
    </main>
);

export default Content;
