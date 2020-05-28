import React, { useState } from "react";
import Input from "../Input";
import "./TableFilterInput.scss";

const style = {
    input: {
        minHeight: 32,
        marginTop: 4,
        borderRadius: 10
    }
};

const TableFilterInput = ({ onChange, placeholder, field, tableParams }) => {
    const handleChange = event => {
        onChange({
            ...tableParams,
            per_page: tableParams.per_page === -1 ? null : tableParams.per_page,
            [field]: event.target.value
        })
    };

    return (
        <Input
            className="table_filter_input"
            style={style.input}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
};

export default TableFilterInput;
