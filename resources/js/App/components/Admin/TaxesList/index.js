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

const TaxesList = ({ data = [] }) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Податок</TableCell>
                        <TableCell align="left">Номер податка</TableCell>
                        <TableCell align="left">Нарахування податка</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map(item => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.title}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.id}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span style={{ fontWeight: "bold" }}>{item.percent} %</span>
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

export default TaxesList;