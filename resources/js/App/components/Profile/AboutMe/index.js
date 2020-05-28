import React from "react";
import BoxTitle from "../Common/BoxTitle"
import "./style.scss";
import Preloader from "../../Preloader";
import connect from "react-redux/es/connect/connect";
import moment from "moment";

const AboutMe = props => {
    return (
        <div
            className={`about-me__container ${props.styleName}`}
        >
            <BoxTitle title="Обо мне"/>
            {props.pending ?
                <div className="about-me__body center">
                    <Preloader/>
                </div>
                :
                <div className="about-me__body">
                    <div className="about-me__half">
                        <div className="about-me__card">
                            <div className="about-me__sub-title">День рожденния</div>
                            <div className="about-me__info">{ moment(props.userInfo.user.birthday).format('YYYY MM DD') }</div>
                        </div>
                        <div className="about-me__card">
                            <div className="about-me__sub-title">Пол</div>
                            <div className="about-me__info">{props.userInfo.user.sex}</div>
                        </div>
                        <div className="about-me__card">
                            <div className="about-me__sub-title">Електронная почта</div>
                            <div className="about-me__info">{props.userInfo.user.email}</div>
                        </div>
                        <div className="about-me__card">
                            <div className="about-me__sub-title">Телефон</div>
                            <div className="about-me__info">{props.userInfo.user.phone}</div>
                        </div>
                    </div>
                    <div className="about-me__half">
                        <div className="about-me__card">
                            <div className="about-me__sub-title">Работает в офисе</div>
                            <div className="about-me__info">{props.userInfo.user.office}</div>
                        </div>
                        <div className="about-me__card">
                            <div className="about-me__sub-title">Социальные сети</div>
                            <div className="about-me__info-list">
                                {
                                    props.userInfo.user.social_network.map(function(link, key) {
                                        return <div key={key} className="about-me__info-list-item">
                                            <a href={link} target="_blank">{ link }</a>
                                        </div>
                                    })
                                }
                            </div>
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

export default connect(mapStateToProps)(AboutMe);
