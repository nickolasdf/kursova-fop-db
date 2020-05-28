import React from "react";
import "./index.scss"
import clsx from "clsx";
import CommentsDisplayBlock from "./CommentsDisplayBlock";
import CommentsMainInput from "./CommentsMainInput";


const Comments = ({ style, comments = [], className = "", onSendComment, onChange }) => {
    return(
        <div className={clsx("comments_block", className)} style={style}>
            <CommentsDisplayBlock comments={comments} onChange={onChange} />
            <CommentsMainInput onSendComment={onSendComment} />
        </div>
    )
};

export default Comments;
