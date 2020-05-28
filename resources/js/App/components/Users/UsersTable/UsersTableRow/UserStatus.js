import React from 'react';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';

import './index.scss';

/**
 * Component for rendering styled user status
 * @param {object} props - component props.
 * @param {string} props.status - user status.
 */
const UserStatus = ({ status }) => {

    const statusClass = (status === 'свободен')
        ? 'user user__available'
        : 'user user__not-available';

    return (
        status ? (
            <div className={statusClass}>
                {/* Icons*/}
                {(status === 'свободен') ?
                    <FlagOutlinedIcon
                        className="user__status-icon"
                        style={{ fontSize: 13 }}
                    /> :
                    <QueryBuilderOutlinedIcon
                        className="user__status-icon"
                        style={{ fontSize: 13 }}
                    />
                }

                {status}
            </div>
        ) : ('')
    );
};

export default UserStatus;
