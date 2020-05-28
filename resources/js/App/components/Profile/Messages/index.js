import React from "react";
import "./style.scss";
import BoxTitle from "../Common/BoxTitle";
import Preloader from "../../Preloader";
import connect from "react-redux/es/connect/connect";
import InputBase from '@material-ui/core/InputBase';

const Messages = props => {
    return (
        <div
            className={`messages__container ${props.styleName}`}
        >
            <BoxTitle title="Сообщение"/>
            {props.pending ?
                <div className="messages__body center">
                    <Preloader/>
                </div>
                :
                <div className="messages__body">
                    <div className="messages__messages-list">
                        {
                            props.userInfo.comments.map((message) => {
                                return (
                                    <div className="messages__messages-list-item">
                                        <div className="messages__photo">
                                            <img src={message.ownerImage} alt="avatar"/>
                                        </div>
                                        <div className="messages__messages-list-item-body">
                                            <div className="messages__messages-list-item-body-header">
                                                <div className="messages__body-header-name">{message.ownerName}</div>
                                                <div className="messages__body-header-date">{message.created_at}</div>
                                            </div>
                                            <div className="messages__messages-list-item-body-text">{message.comment}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <hr/>

                    <div className="messages__send-message-block">
                        <div className="messages__send-message-block-attach">
                            <img src="/img/attach-file-icon.svg" alt="attach"/>
                        </div>
                        <div className="messages__send-message-block-input">
                            <InputBase
                                fullWidth={true}
                                placeholder="Написать комментарий"
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                        </div>
                        <div className="messages__send-message-block-send">
                            <img src="/img/send-comment-icon.svg" alt="send"/>
                        </div>
                    </div>


                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo,
    pending: state.Profile.pending,
});

export default connect(mapStateToProps)(Messages);


