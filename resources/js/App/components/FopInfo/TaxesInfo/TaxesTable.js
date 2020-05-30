import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

const TaxesTable = ({ data = [] }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Дата</TableCell>
                        <TableCell align="left">Податок</TableCell>
                        <TableCell align="left">Номер податка</TableCell>
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
                                        <span style={{ fontWeight: "bold", color: "red" }}>- {item.total} грн</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.tax_id}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.fop_income_id}</span>
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

export default TaxesTable;