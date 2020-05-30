import React from "react";
import "./IncomeTable.scss";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

const IncomeTable = ({ data = [] }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Дата</TableCell>
                        <TableCell align="left">Дохід</TableCell>
                        <TableCell align="left">Номер доходу</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map(item => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.date}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold", color: "green" }}>+ {item.total} грн</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.id}</span>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default IncomeTable;