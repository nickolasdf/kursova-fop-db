import React from "react";

import { TableCell } from "@material-ui/core";
import UserProfile from "./UserProfile";
import UserRank from "./UserRank";
import UserLocation from "./UserLocation";
import UserStatus from "./UserStatus";

const UsersTableRow = ({ rowData }) => {
    return (
        <>
            <TableCell>
                <UserProfile name={rowData.name} />
            </TableCell>
            <TableCell>
                {rowData.role}
            </TableCell>
            <TableCell>
                <UserRank rank={rowData.rank} />
            </TableCell>
            <TableCell>
                <UserLocation location={rowData.office} />
            </TableCell>
            <TableCell>
                {rowData.department}
            </TableCell>
            <TableCell>
                <UserStatus status={rowData.available} />
            </TableCell>
        </>
    )
};

export default UsersTableRow;
