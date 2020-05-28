import React, { useState, useEffect } from "react";

import "./index.scss";
import Comments from "../../Comments";
import requests from "../../../requests";

const HostingComments = ({ hostingData }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        requests.Hostings.getComments(hostingData.id).then(resp => {
            setComments(resp.data)
        })
    }, []);

    const addHostingComment = commentData => {
        return requests.Hostings.addComment(hostingData.id, commentData).then(resp => {
            setComments(resp.data.comments)
        })
    };

    const onCommentsChange = newComments => {
        setComments(newComments)
    };

    return (
        <Comments
            comments={comments}
            onSendComment={addHostingComment}
            onChange={onCommentsChange}
        />
    )
};

export default HostingComments;
