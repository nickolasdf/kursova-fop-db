import React, {useState, useRef} from "react";
import {IconButton, Tooltip} from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import {getBase64, shortenString} from "../../config/constants";

const CommentsMainInput = ({ onSendComment }) => {
    const [comment, setComment] = useState("");
    const [file, setFile] = useState({ name: null });

    const handleCommentChange = event => {
        setComment(event.target.value)
    };

    const onChangeFile = event => {
        event.preventDefault();
        const file = event.target.files[0];
        getBase64(file).then(result => {
            setFile({ base64: result, name: file.name })
        })
    };

    let inputFileRef = useRef(null);

    const clearInput = () => {
        inputFileRef.current.value = "";
        setFile({ name: null, base64: null });
        setComment("");
    };

    const submitForm = event => {
        event.preventDefault();

        if(comment.length > 0 || file.base64) {
            const formData = {
                comment: comment,
                image: file.base64,
                image_name: file.name
            };

            if(onSendComment) {
                onSendComment(formData).then(() => {
                    clearInput();
                });
            }
        }
    };

    return (
        <div className="comment_input_block">
            <div className="input_icon_wrapper">
                <IconButton component="label">
                    <AttachFile className="input_icon" />
                    <input className="attach_file_input" type="file" onChange={onChangeFile} ref={inputFileRef}/>
                </IconButton>
            </div>
            <div className="input_wrapper">
                <form onSubmit={submitForm}>
                    <input placeholder="Написать комментарий" onChange={handleCommentChange} value={comment} />
                </form>
            </div>
            {
                file.name ?
                    <div className="attach_file_name_wrapper">
                        <Tooltip title={file.name}>
                            <span className="attach_file_name">{shortenString(file.name, 10)}</span>
                        </Tooltip>
                        <ClearIcon className="clear_attach_file_icon" onClick={clearInput} />
                    </div> : null
            }
            <div className="input_icon_wrapper">
                <button className="comments_send_btn" onClick={submitForm}>
                    <SendIcon className="input_icon" />
                </button>
            </div>
        </div>
    )
};

export default CommentsMainInput;
