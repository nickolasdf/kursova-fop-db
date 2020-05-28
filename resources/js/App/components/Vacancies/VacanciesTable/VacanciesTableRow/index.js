import React from 'react';
import { TableCell } from '@material-ui/core';
import './index.scss';

const ownerImage = '/img/profile-icon.png';

const VacanciesTableRow = ({ row }) => {

    return (
        <>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.city}</TableCell>
            <TableCell>
                {row.salary_from}
            </TableCell>
            <TableCell>
                {row.salary_to}
            </TableCell>
            <TableCell>
                <img className="vacancies-table__owner-image" alt="ownerImage" src={ownerImage}/>
                <span>{row.owner}</span>
            </TableCell>
        </>
    );
};

export default VacanciesTableRow;
