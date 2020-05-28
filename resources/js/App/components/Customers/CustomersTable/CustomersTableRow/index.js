import React from "react";
import TableCell from "@material-ui/core";

import "./index.scss";

const CustomersTableRow = row => {
    return (
        <>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.contact}</TableCell>
            <TableCell><span className="contragents__email">{row.email}</span></TableCell>
            <TableCell>{row.phone}</TableCell>
            <TableCell><span className="contragents__balance-positive">{row.balance}</span></TableCell>
        </>
    )
};

export default CustomersTableRow;
