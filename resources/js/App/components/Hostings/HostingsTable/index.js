import React, { useState } from "react";
import Table from "../../custom/Table";
import { useSelector, useDispatch } from "react-redux";
import { getHostings } from "../../../reducers/Hostings/actions";
import { hostingsTableColumns } from "./utils";
import { makeStyles, TableCell, Tooltip } from "@material-ui/core";
import HostingsTableSitesList from "./HostingsTableSitesList";
import copy from 'copy-to-clipboard';
import "./index.scss";

import HostingPlanCell from "./HostingPlanCell";
import useModal from "../../../config/hooks/useModal";
import EditHostingModal from "../EditHostingModal";
import HostingsTableToolbar from "./HostingsTableToolbar";
import moment from "moment";
import {throwAlert} from "../../../reducers/App/actions";
import {INFO} from "../../../config/alertVariants";

const tooltipTitle = "Скопировать в буфер обмена";

const useStyles = makeStyles({
    tableCell: {
        fontSize: 14,
        fontWeight: 500,
        fontStyle: "normal"
    }
});


const HostingsTable = () => {
    const dispatch = useDispatch();
    const { Hostings } = useSelector(state => state);
    const [currentRowData, setCurrentRowData] = useState({});
    const hostingModal = useModal();

    const classes = useStyles();

    const getHostingsWithParams = newParams => {
        dispatch(getHostings(newParams));
    };

    const handleClickRow = row => {
        setCurrentRowData(row);
        hostingModal.openModal();
    };

    const handleFilter = params => {
        getHostingsWithParams(params)
    };

    const handleClickText = text => event => {
        event.stopPropagation();
        copy(text);
        dispatch(throwAlert(INFO, "Текст скопировано в буфер обмена"))
    };

    const tableRow = ({ rowData }) => {
        return (
            <>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    <HostingsTableSitesList sites={rowData.sites} hostingData={rowData} />
                </TableCell>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    <Tooltip title={tooltipTitle}>
                        <span className="hostings_table__clipboard-text" onClick={handleClickText(rowData.customerName)}>{rowData.customerName}</span>
                    </Tooltip>
                </TableCell>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    <Tooltip title={tooltipTitle}>
                        <span className="hostings_table__clipboard-text" onClick={handleClickText(rowData.customerPhone)}>{rowData.customerPhone}</span>
                    </Tooltip>
                </TableCell>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    <Tooltip title={tooltipTitle}>
                        <span className="hostings_table__clipboard-text" onClick={handleClickText(rowData.customerEmail)}>{rowData.customerEmail}</span>
                    </Tooltip>
                </TableCell>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    <div>{rowData.serverName}</div>
                    <div className="hostings_table__server-description">{rowData.serverDescription}</div>
                </TableCell>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    ₴ {rowData.expense}
                </TableCell>
                <TableCell classes={{ body: classes.tableCell }} style={{ verticalAlign: "top"}}>
                    <HostingPlanCell date={moment(rowData.expired_at).format("DD.MM.YYYY")} indicatorValue={rowData.color} />
                </TableCell>
            </>
        )
    };

    return (
        <>
            <Table
                data={Hostings.data}
                columns={hostingsTableColumns}
                onChange={getHostingsWithParams}
                total={Hostings.meta.total}
                initialTableParams={{ order_field: "expired_at" }}
                components={{
                    Row: tableRow,
                    Toolbar: ({ selected, clearSelected }) => <HostingsTableToolbar selectedHostings={selected}  clearSelectedHostings={clearSelected}/>
                }}
                onRowClick={handleClickRow}
                onFilter={handleFilter}
            />
            <EditHostingModal
                open={hostingModal.open}
                onClose={hostingModal.closeModal}
                hostingData={currentRowData}
            />
        </>
    )
};

export default HostingsTable;
