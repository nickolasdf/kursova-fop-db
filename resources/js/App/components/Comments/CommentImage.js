import React, {useState} from "react";
import {Dialog, IconButton, Tooltip, makeStyles} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    dialogImage: {
        height: "calc(100% - 96px)",
        padding: "12px 0"
    },
    downloadButtonIcon: {
        width: "32px",
        height: "32px"
    },
    closeIcon: {
        width: "32px",
        height: "32px"
    },
    closeButton: {
        position: "absolute",
        top: 12,
        right: 12
    },
    downloadButton: {
        position: "absolute",
        bottom: 12,
        right: 12
    }
});


const CommentImage = ({ name, path }) => {
    const [imageOpen, setImageOpen] = useState(false);
    const classes = useStyles();

    const handleImageOpen = ()  => {
        setImageOpen(true);
    };

    const handleImageClose = () => {
        setImageOpen(false);
    };

    return (
        <>
            {
                (name && path) &&
                    <>
                        {
                            name.match(/.(jpg|jpeg|png|gif)$/i) ?
                                <div onClick={handleImageOpen} className="comment_image_wrapper">
                                    <img className="comment_image" alt={name} src={path} />
                                </div> :
                                <span className="comment_attach_file_name">
                                    <a href={path} download>{name}</a>
                                </span>
                        }
                    </>
            }
            <Dialog
                classes={{ paperScrollPaper: classes.dialogImage }}
                open={imageOpen} onClose={handleImageClose}
                fullWidth={true}
                maxWidth={false}
            >
                <IconButton className={classes.closeButton} onClick={handleImageClose}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
                <a href={path} download>
                    <Tooltip title="Скачать">
                        <IconButton className={classes.downloadButton}>
                            <GetAppIcon className={classes.downloadButtonIcon} />
                        </IconButton>
                    </Tooltip>
                </a>
                <img className="dialog_image" alt={name} src={path} />
            </Dialog>
        </>
    )
};

export default CommentImage;
