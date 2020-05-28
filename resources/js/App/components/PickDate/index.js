import React, { useState } from "react";
import PickCustomDateModal from "../PickCustomDateModal"
import "./style.scss";
import moment from "moment";
import { setDateConfig } from "../../reducers/App/actions";
import { CalendarIcon } from "../Icons";
import { connect } from "react-redux";
import {DatePicker} from "@material-ui/pickers";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";

const styles = {
    datePicker: {
        width: "100%",
        margin: 0
    },
    datePickerInput: {
        border: "solid 1px #e0e0e0",
        backgroundColor: "white",
        minHeight: "40px",
        marginTop: "-1px",
        display: "flex",
        justifyContent: "center",
        padding: "0 12px",
        transition: "background-color 0.4s",
        "&:hover": {
            backgroundColor: "#cdcdcd"
        }
    },
    firstPeriodPicker: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginRight: -1
    },
    secondPeriodPicker: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
};

const PickDate = props => {
    const [isShow, setIsShow] = useState(false);
    const {
        dateConfig,
        setDateConfig,
        updateDashboardData,
        classes
    } = props;

    const handleDateChange = name => date => {
        const fromDate = moment(dateConfig.dateTo);
        const toDate = moment(dateConfig.dateFrom);
        const diff = fromDate.diff(toDate, "days");

        setDateConfig({
            ...dateConfig,
            formatBy: diff < 30 ? "day" : "year",
            [name]: moment(date).format()
        });
        if(name === "dateFrom") {
            updateDashboardData({
                period_from: moment(date).format("YYYY-MM-DD")
            });
        }
        else if(name === "dateTo") {
            updateDashboardData({
                period_to: moment(date).format("YYYY-MM-DD")
            });
        }

    };
    return (
        <div
            className={`pick-date__container ${props.paddingLeftZero &&
                "pick-date--padding-left-zero"}`}
        >
            <button className="dashboard_period_btn" onClick={() => setIsShow(!isShow)}>
                <CalendarIcon />
            </button>
            <div className="pick-date__picker">
                <div className="pick-date__input-container">
                    <DatePicker
                        disableToolbar
                        variant="inline"
                        format="DD.MM.YYYY"
                        margin="normal"
                        id="date-picker-inline"
                        value={ dateConfig.dateFrom }
                        onChange={handleDateChange("dateFrom")}
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                input:  clsx(classes.datePickerInput, classes.firstPeriodPicker)
                            },
                            type: "button"
                        }}
                        classes={{
                            root: classes.datePicker
                        }}
                        autoOk={true}
                    />
                </div>
                <div className="pick-date__input-container">
                    <DatePicker
                        disableToolbar
                        variant="inline"
                        format="DD.MM.YYYY"
                        margin="normal"
                        id="date-picker-inline"
                        value={dateConfig.dateTo}
                        onChange={handleDateChange("dateTo")}
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                input: clsx(classes.datePickerInput, classes.secondPeriodPicker)
                            },
                            type: "button"
                        }}
                        classes={{
                            root: classes.datePicker
                        }}
                        autoOk={true}
                    />
                </div>
            </div>
            <PickCustomDateModal
                updateDashboardData={updateDashboardData}
                setDateConfig={setDateConfig}
                dateConfig={dateConfig}
                isShow={isShow}
                closeModal={() => setIsShow(false)}
            />
        </div>
    );
};

const mapStateToProps = ({ App }) => ({
    dateConfig: App.dateConfig
});

const mapDispatchToProps = {
    setDateConfig
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PickDate));
