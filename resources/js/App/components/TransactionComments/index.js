import React, { useEffect, useState } from 'react';
import Comments from '../Comments';
import './index.scss';
import requests from '../../requests';

const TransactionComments = ({ id, onChange, defaultComments }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(defaultComments);
    }, [defaultComments]);

    const addTransactionComment = commentData => {
        return requests.Transaction.addComment(id, commentData).then(resp => {
            setComments(resp.data.comments);
        });
    };

    const onCommentsChange = newComments => {
        setComments(newComments);
        onChange(newComments);
    };

    return (
        <Comments comments={comments} onChange={onCommentsChange} onSendComment={addTransactionComment}/>
    );
};

export default TransactionComments;
