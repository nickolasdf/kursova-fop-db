import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core';

import './index.scss';

const style = {
    activeIcon: {
        color: 'black',
        fontSize: 20
    },
    triangleIcon: {
        color: '#ADADAD',
        fontSize: 20
    }

};

const TableSortNav = ({ orderBy, classes }) => {
    return (
        <span className="table_sort_icon">
            <span className="arrow_up_icon">
                <ArrowDropUpIcon className={orderBy === 'ASC' ? classes.activeIcon : classes.triangleIcon}/>
            </span>
            <span className="arrow_down_icon">
                <ArrowDropDownIcon className={orderBy === 'DESC' ? classes.activeIcon : classes.triangleIcon}/>
            </span>
        </span>
    );
};

export default withStyles(style)(TableSortNav);
