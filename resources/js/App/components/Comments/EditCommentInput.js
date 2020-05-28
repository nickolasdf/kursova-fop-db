import React, {useEffect, useState} from "react";
import "./EditCommentInput.scss";
import Input from "../custom/Input";

const EditCommentInput = ({ onClose, onSave, value }) => {
    const [comment, setComment] = useState("");

    useEffect(() => {
        setComment(value);
    }, [value]);

    const onChangeComment = event => {
        setComment(event.target.value);
    };

    const saveComment = () => {
        onSave(comment)
    };

    return (
        <div className="comment_edit_block">
            <Input type="textarea" value={comment} onChange={onChangeComment} />
                <div className="comment_edit_buttons_wrapper">
                    <button className="form_action_btn form_submit_action_btn" onClick={saveComment}>Сохранить</button>
                    <button className="form_action_btn form_cancel_action_btn" onClick={onClose}>Отменить</button>
                </div>
        </div>
    )
};

export default EditCommentInput;
