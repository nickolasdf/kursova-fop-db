import React from "react";
import CustomSelect from "react-select";

export const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#ffd63c',
        primary: '#ffd63c'
    },
});

export const selectStyles = {
    control: () => ({
        display: "flex",
        alignItems: "center",
        border: "solid 1px #e0e0e0",
        width: "100%",
        minHeight: "40px",
        backgroundColor: "white",
        fontSize: "14px",
    })
};

const Select = ({controlStyles = {}, ...props}) => {
    return(
        <CustomSelect
            theme={selectTheme}
            styles={{
                control: () => ({
                    display: "flex",
                    alignItems: "center",
                    border: "solid 1px #e0e0e0",
                    width: "100%",
                    height: "40px",
                    backgroundColor: "white",
                    fontSize: "14px",
                    ...controlStyles
                })
            }}
            {...props}
        />
        )

};

export default Select;
