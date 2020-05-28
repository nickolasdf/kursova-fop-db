import React from "react";
import { makeStyles } from "@material-ui/core";
import { DatePicker }  from '@material-ui/pickers';

const useStyles = makeStyles({
    datePicker: {
        width: "100%",
        margin: 0
    },
    datePickerInput: {
        border: "solid 1px #e0e0e0",
        backgroundColor: "white",
        minHeight: "50px",
        marginTop: "-1px",
        display: "flex",
        justifyContent: "center",
        padding: "0 12px"
    }
});

const CustomDatePicker = ({ value = new Date(), onChange }) => {
    const classes = useStyles();
    return (
        <DatePicker
            openTo="year"
            views={["year", "month", "date"]}
            autoOk={true}
            variant="inline"
            format="DD.MM.YYYY"
            margin="normal"
            id="date-picker-inline"
            value={value}
            onChange={onChange}
            InputProps={{
                disableUnderline: true,
                classes: {
                    input: classes.datePickerInput
                }
            }}
            classes={{
                root: classes.datePicker
            }}
        />
    )
};

export default CustomDatePicker;
