import React, { useEffect, useRef, useState } from 'react';
import EditCommentInput from './EditCommentInput';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import FixCommentIcon from '../Icons/FixCommentIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import requests from '../../requests';
import CommentImage from './CommentImage';
import clsx from 'clsx';
import VerticalFixCommentIcon from '../Icons/VerticalFixCommentIcon';
import useModal from '../../config/hooks/useModal';
import ConfirmModal from '../ConfirmModal';

const CommentsDisplayBlock = ({ comments, onChange }) => {
    const [commentEdit, setCommentEdit] = useState(false);
    const [commentSticky, setCommentSticky] = useState(false);
    const [currentComment, setCurrentComment] = useState({});
    const [currentFixedComment, setCurrentFixedComment] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const deletingConfirmModal = useModal();

    useEffect(() => {
        if (!commentEdit) {
            scrollToBottom();
        }
    }, [comments]);

    const scrollToBottom = () => {
        chatBlockRef.scrollTo(0, chatBlockRef.scrollHeight);
    };
    let chatBlockRef = useRef();

    const handleMenuOpen = comment => event => {
        setAnchorEl(event.currentTarget);
        setCurrentComment(comment);
        setCommentEdit(false);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteComment = () => {
        requests.Comments.delete(currentComment.id)
            .then(resp => {
                onChange(resp.data);
            })
            .then(() => {
                deletingConfirmModal.closeModal();
            });
    };

    const editComment = (editedText) => {
        requests.Comments.edit(currentComment.id, { comment: editedText })
            .then(resp => {
                onChange(resp.data);
            })
            .then(() => {
                setCommentEdit(false);
            });
    };

    const onCommentEditClose = () => {
        setCommentEdit(false);
    };
    const handleClickDelete = () => {
        deletingConfirmModal.openModal();
        handleMenuClose();
    };

    const handleClickEdit = () => {
        handleMenuClose();
        setCommentEdit(true);
    };

    const handleClickFixComment = comment => () => {
        setCurrentFixedComment(comment);
        setCommentSticky(true);
    };

    const handleClickDisfixComment = () => () => {
        setCurrentFixedComment(false);
    };

    return (
        <>
            <div className="comment_display_block" ref={ref => chatBlockRef = ref}>
                {
                    comments.map(item => {
                        return (
                            <div
                                key={item.id}
                                className={clsx('comment_wrapper', {
                                    ['comment_sticky']: commentSticky && currentFixedComment.id === item.id
                                })}
                            >
                                <div className="profile_image">
                                    <img width="24" height="24" src={item.ownerImage} alt="ownerImage"/>
                                </div>
                                {
                                    commentEdit && currentComment.id === item.id ?
                                        <EditCommentInput
                                            onSave={editComment}
                                            onClose={onCommentEditClose}
                                            value={currentComment.comment}
                                        /> :
                                        <div style={{ width: 'calc(100% - 32px)' }}>
                                            <div className="comment_header">
                                                <span className="owner_name">{item.ownerName}</span>
                                                <div>
                                                    <span className="comment_date">{item.created_at}</span>
                                                    {
                                                        commentSticky && currentFixedComment.id === item.id ?
                                                            <IconButton
                                                                className="fix_comment_btn"
                                                                size="small"
                                                                onClick={handleClickDisfixComment()}
                                                            >
                                                                <VerticalFixCommentIcon/>
                                                            </IconButton> :
                                                            <IconButton
                                                                className="fix_comment_btn"
                                                                size="small"
                                                                onClick={handleClickFixComment(item)}
                                                            >
                                                                <FixCommentIcon/>
                                                            </IconButton>
                                                    }
                                                    <IconButton size="small" onClick={handleMenuOpen(item)}>
                                                        <MoreVertIcon className="more_vert_icon"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="comment_text">
                                                <pre>{item.comment}</pre>
                                            </div>
                                            <CommentImage name={item.image.image} path={item.image.imagePath}/>
                                        </div>
                                }
                            </div>
                        );
                    })
                }
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleClickEdit}>Редактировать</MenuItem>
                <MenuItem onClick={handleClickDelete}>Удалить</MenuItem>
            </Menu>
            <ConfirmModal
                isOpen={deletingConfirmModal.open}
                onClose={deletingConfirmModal.closeModal}
                onAccept={deleteComment}
                title="Вы действительно хотите удалить комментарий?"
                acceptLabel="Удалить"
            />
        </>
    );
};

export default CommentsDisplayBlock;
