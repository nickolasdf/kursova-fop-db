import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import React from "react";
import TableSortNav from "../../TableSortNav";
import TableFilterInput from "./TableFilterInput";

function EnhancedTableHead(props) {
    const {
        classes,
        onRequestSort,
        tableConfig,
        onSelectAllClick,
        numSelected,
        columns,
        select,
        onFilter,
        tableParams,
        total
    } = props;

    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.headerTable}>
            <TableRow>
                {
                    select &&
                    <TableCell align="center" padding="none">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < total}
                            checked={numSelected === total}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                }
                {
                    columns.map(headCell => {
                        return (
                            <TableCell
                                key={headCell.field}
                                align="left"
                                sortDirection={tableConfig.order_field === headCell.field ? tableConfig.order_type.toLowerCase() : false}
                                className={classes.headerLabel}
                            >
                                {
                                    headCell.isFilter ?
                                        <TableFilterInput
                                            placeholder={headCell.label}
                                            onChange={onFilter}
                                            field={headCell.field}
                                            tableParams={tableParams}
                                        /> :
                                        <>
                                            <TableSortLabel
                                                active={tableConfig.order_field === headCell.field}
                                                direction={tableConfig.order_type.toLowerCase()}
                                                onClick={createSortHandler(headCell.field)}
                                                classes={{ icon: classes.sortIcon }}
                                            >
                                                {headCell.label}
                                                <span style={{
                                                    opacity: tableConfig.order_field === headCell.field ? 1 : 0,
                                                    marginLeft: 4
                                                }}>
                                                <TableSortNav orderBy={tableConfig.order_type} />
                                            </span>
                                            </TableSortLabel>
                                        </>
                                }
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    );
}


export default EnhancedTableHead;
