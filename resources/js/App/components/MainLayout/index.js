import React, { memo } from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import "./style.scss";

const MainLayout = props => (
    <SideBar>
        <>
            <Header />
            <div className="content">
                <main className="main">
                    <div className="main-container">{props.children}</div>
                </main>
            </div>
        </>
    </SideBar>
);

export default memo(MainLayout);
