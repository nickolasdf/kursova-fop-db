import React, {useEffect, useState} from "react";
import Comments from "../../components/Comments";
import requests from "../../requests";

const ContragentComments = ({ comments, contragentId }) => {

    const [commentsData, setCommentsData] = useState([]);

    useEffect(() => {
        setCommentsData(comments);
    }, [comments]);

    const addContragentComment = commentData => {
        return requests.Customer.addComment(contragentId, commentData).then(resp => {
            setCommentsData(resp.data.comments)
        })
    };

    const onCommentsChange = newComments => {
        setCommentsData(newComments);
    };

    return (
        <Comments comments={commentsData} onSendComment={addContragentComment} onChange={onCommentsChange} />
    )
};

export default ContragentComments;
