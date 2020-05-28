import React from "react";
import "./style.scss";
import BoxTitle from "../Common/BoxTitle";
import Preloader from "../../Preloader";
import connect from "react-redux/es/connect/connect";

const Languages = props => {
    return (
        <div
            className={`languages__container ${props.styleName}`}
        >
            <BoxTitle title="Владение языками"/>
            {props.pending ?
                <div className="languages__body center">
                    <Preloader/>
                </div>
                :
                <div className="languages__body">
                    <div className="languages__lang-list">
                        {
                            props.userInfo.languages.map((language) => {
                                return <div key={language.value} className="languages__lang-list-item"><b>{language.value}</b> - {language.level}</div>
                            })
                        }

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

export default connect(mapStateToProps)(Languages);

