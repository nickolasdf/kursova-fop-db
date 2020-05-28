import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import HostingIcon from "../../Icons/HostingIcon";
import {getHostingStatistics} from "../../../reducers/HostingStatistics/actions";
import "./index.scss";

const HostingInfoBlock = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.HostingStatistics.data);

    useEffect(() => {
        dispatch(getHostingStatistics())
    }, []);

    const currencySymbol = "₴";

    return (
        <div className="hosting_statistics_block">
            <div className="hosting_statistics_item hosting_statistics_first_item">
                <HostingIcon />
            </div>
            <div className="hosting_statistics_item">
                <span>Количество клиентов</span>
                <span className="hosting_statistics_amount">{statistics.count}</span>
            </div>
            <div className="hosting_statistics_item">
                <span>Общий оборот по серверам</span>
                <span className="hosting_statistics_amount">{statistics.income} {currencySymbol}</span>
            </div>
            <div className="hosting_statistics_item">
                <span>Затраты в год</span>
                <span className="hosting_statistics_amount">{statistics.expense} {currencySymbol}</span>
            </div>
            <div className="hosting_statistics_item">
                <span>Доходность в год</span>
                <span className="hosting_statistics_amount">{statistics.profit} {currencySymbol}</span>
            </div>
        </div>
    )
};

export default HostingInfoBlock;
