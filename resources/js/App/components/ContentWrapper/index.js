import React from 'react';
import './index.scss';
import Header from "../Header";

const ContentWrapper = ({ children }) => {
    return (
        <div className="content-wrapper">
            <Header/>
            <hr />
            {children}
        </div>
    );
};

export default ContentWrapper;
