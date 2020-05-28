import React from "react";
import "./style.scss";
import BoxTitle from "../Common/BoxTitle";
import Preloader from "../../Preloader";
import connect from "react-redux/es/connect/connect";

const Skills = props => {
    return (
        <div
            className={`skills__container ${props.styleName}`}
        >
            <BoxTitle title="Навыки"/>
            {props.pending ?
                <div className="skills__body center">
                    <Preloader/>
                </div>
                :
                <div className="skills__body">
                    <div className="skills__skills-list">
                        {
                            props.userInfo.skills.map((skill) => {
                                return <div key={skill.value} className="skills__skills-list-item">{skill.value}</div>
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

export default connect(mapStateToProps)(Skills);
