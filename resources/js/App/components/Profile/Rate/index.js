import React from "react";
import "./style.scss";
import BoxTitle from "../Common/BoxTitle";
import Preloader from "../../Preloader";
import connect from "react-redux/es/connect/connect";
import CurrentRateChart from "../Common/CurrentRateChart";

const Rate = props => {

    const getData = () => {
        return [
            {
                "id": "1",
                "label": "Рейт",
                "value": props.userInfo.user.rate,
            },
            {
                "id": "2",
                "label": "Доступно",
                "value": (props.userInfo.user.rateMax - props.userInfo.user.rate),
            }];
    };

    return (
        <div
            className={`rate__container ${props.styleName}`}
        >
            <BoxTitle title="Текущий рейт"/>
            {props.pending ?
                <div className="rate__body center">
                    <Preloader/>
                </div>
                :
                <div className="rate__body">
                    <CurrentRateChart data={getData()} label="за 1 час роботы" />
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo,
    pending: state.Profile.pending,
});

export default connect(mapStateToProps)(Rate);


