import React from 'react';
import SignalWifi1BarIcon from '@material-ui/icons/SignalWifi1Bar';
import SignalWifi2BarIcon from '@material-ui/icons/SignalWifi2Bar';
import SignalWifi3BarIcon from '@material-ui/icons/SignalWifi3Bar';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import './index.scss';

/**
 * Component to render user rank and rank icon
 */
const UserRank = ({ rank }) => {
    const renderRank = () => {
        switch (rank) {
            case 'Trainee':
                return <SignalWifi1BarIcon className="user__rank-icon" style={{ fontSize: 14 }}/>;
            case 'Junior':
                return <SignalWifi2BarIcon className="user__rank-icon" style={{ fontSize: 14 }}/>;
            case 'Middle':
                return <SignalWifi3BarIcon className="user__rank-icon" style={{ fontSize: 14 }}/>;
            case 'Senior':
                return <SignalWifi4BarIcon className="user__rank-icon" style={{ fontSize: 14 }}/>;
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Render rank icon */}
            {renderRank()}

            {rank}
        </div>
    );
};

export default UserRank;
