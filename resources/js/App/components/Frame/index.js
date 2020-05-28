import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import Content from "../Content";
import "./style.scss";

const Frame = props => {
    return (
        <>
            <Header />
            <div className="content">
                <SideBar />
                <Content>{props.children}</Content>
            </div>
        </>
    );
};

export default Frame;
