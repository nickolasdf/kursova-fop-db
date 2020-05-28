import React, {useState} from "react";
import "./style.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import moment from "moment";
import clsx from "clsx";
import {setDateConfig} from "../../reducers/App/actions";
import {connect} from "react-redux";

const PickCustomDateModal = ({ isShow, closeModal, setDateConfig, dateConfig, updateDashboardData }) => {
    const [isClickListenerEnabled, setIsClickListenerEnabled] = useState(true);
    const pickDate = format => async () => {
        await setDateConfig({
            formatBy: format,
            dateFrom: moment().startOf(format).format(),
            dateTo: moment().endOf(format).format()
        });
        await updateDashboardData();
        closeModal();
    };

    return (
        <>
            {
                isShow ?
                    <ClickAwayListener onClickAway={closeModal} mouseEvent={isClickListenerEnabled ? "onClick" : false}>
                        <div className={"pick-date__modal"}>
                            <button className={clsx("pick-date__item", dateConfig.formatBy === "week" && "pick-date__item__active")} onClick={pickDate("week")}>Неделя</button>
                            <button className={clsx("pick-date__item", dateConfig.formatBy === "month" && "pick-date__item__active")} onClick={pickDate("month")}>Месяц</button>
                            <button className={clsx("pick-date__item", dateConfig.formatBy === "quarter" && "pick-date__item__active")} onClick={pickDate("quarter")}>Квартал</button>
                            <button className={clsx("pick-date__item", dateConfig.formatBy === "year" && "pick-date__item__active")} onClick={pickDate("year")}>Год</button>
                        </div>
                    </ClickAwayListener> : null
            }
        </>
    )
};

const mapStateToProps = ({ App }) => ({
    dateConfig: App.dateConfig
});

const mapDispatchToProps = {
    setDateConfig
};

export default connect(mapStateToProps, mapDispatchToProps)(PickCustomDateModal);
