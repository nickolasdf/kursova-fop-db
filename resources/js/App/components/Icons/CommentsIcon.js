import React from "react";
import "./CommentsIcon.scss";


const CommentsIcon = () => {
    return (
        <svg className="comments_icon_svg" xmlns="http://www.w3.org/2000/svg" width="45" height="31" viewBox="0 0 50 36">
            <path d="M0 15C0 6.71573 6.71573 0 15 0H35C43.2843 0 50 6.71573 50 15C50 23.2843 43.2843 30 35 30H15C6.71573 30 0 23.2843 0 15Z"/>
            <path d="M13 30H23L14.5145 35.0913C13.848 35.4912 13 35.0111 13 34.2338V30Z"/>
            <circle cx="16" cy="15" r="2" fill="#333333"/>
            <circle cx="25" cy="15" r="2" fill="#333333"/>
            <circle cx="34" cy="15" r="2" fill="#333333"/>
        </svg>
    )
};

export default CommentsIcon;
