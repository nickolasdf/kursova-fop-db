import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

const CustomDatePicker = ({ type, buttonProps, ...rest}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <DatePicker
            open={isOpen}
            onClose={handleClose}
            disableToolbar
            variant="inline"
            format="DD.MM.YYYY"
            margin="normal"
            id="date-picker-inline"
            InputProps={{ disableUnderline: true }}
            autoOk={true}
            TextFieldComponent={(datePickerProps) => {
                return (
                    <button onClick={handleOpen}>
                        {
                            datePickerProps.value
                        }
                    </button>
                )
            }}
            {...rest}
        />
    )
};

export default CustomDatePicker;
