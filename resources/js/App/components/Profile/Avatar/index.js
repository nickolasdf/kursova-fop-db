import React from "react";
import Preloader from "../../Preloader";
import BoxTitle from "../Common/BoxTitle";
import "./style.scss";
import connect from "react-redux/es/connect/connect";

const Avatar = props => {
    console.log(props, "props");

    return (
        <div className={`avatar__container ${props.styleName}`}>
            <BoxTitle title="Мой аватар" />
            {props.pending ? (
                <div className="avatar__body center">
                    <Preloader />
                </div>
            ) : (
                <div className="avatar__body">
                    <div className="avatar__photo">
                        <img src={props.userInfo.user.image} alt="avatar" />
                    </div>
                    <div className="avatar__user-name">
                        {props.userInfo.user.name}
                    </div>
                    <div className="avatar__user-position">
                        {props.userInfo.user.department} -{" "}
                        {props.userInfo.user.rank}
                    </div>
                    <hr />
                    <div className="avatar__reward-list">
                        <img
                            src="/img/reward-icon.svg"
                            alt="reward"
                            className="avatar__reward-list-item"
                        />
                        <img
                            src="/img/reward-icon.svg"
                            alt="reward"
                            className="avatar__reward-list-item"
                        />
                        <img
                            src="/img/reward-icon.svg"
                            alt="reward"
                            className="avatar__reward-list-item"
                        />
                        <img
                            src="/img/reward-icon.svg"
                            alt="reward"
                            className="avatar__reward-list-item"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo,
    pending: state.Profile.pending
});

export default connect(mapStateToProps)(Avatar);
