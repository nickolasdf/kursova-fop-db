import React, { useState } from 'react';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import './styles.scss';
import Button from '../../custom/Button';
import AccountModal from './AccountModal';
import { Dialog } from '@material-ui/core';

/**
 * Side section element
 * @param {object} props - component props.
 * @param {object} props.item - Mapped item data.
 * @param {boolean} props.accountModal - Visibility of add/edit account modal.
 * @param {function} props.toggleAccountModal - Handles visibility of add/edit account modal.
 */
const SettingsElement = ({ item, accountModal, toggleAccountModal }) => {
    const [popover, popoverHandler] = useState(null);

    const handleClick = event => {
        popoverHandler(event.currentTarget);
    };

    const handleClose = () => {
        popoverHandler(null);
    };

    // Popover configuration
    const open = Boolean(popover);
    const popoverId = open ? 'simple-popover' : undefined;

    return (
        <div className="element">
            <div className="element__item-container">
                <span>{item.bank1.label}</span>
                <div className="element__right-section">
                    <span>{item.bank1.amount}</span>

                    <SettingsOutlinedIcon
                        className="settings-icon"
                        style={{ fontSize: '14px' }}
                        onClick={handleClick}
                    />
                </div>
            </div>

            <div className="element__item-container">
                <span>{item.bank2.label}</span>
                <div className="element__right-section">
                    <span>{item.bank2.amount}</span>

                    <SettingsOutlinedIcon
                        className="settings-icon"
                        style={{ fontSize: '14px' }}
                        onClick={handleClick}
                    />
                </div>
            </div>

            <div className="element__item-container">
                <span>{item.bank3.label}</span>
                <div className="element__right-section">
                    <span>{item.bank3.amount}</span>

                    <SettingsOutlinedIcon
                        className="settings-icon"
                        style={{ fontSize: '14px' }}
                        onClick={handleClick}
                    />
                </div>
            </div>

            <div className="element__button-container">
                <Button onClick={toggleAccountModal}>Добавить счет</Button>
            </div>

            <Popover
                id={popoverId}
                open={open}
                anchorEl={popover}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <Typography>
                    <div>
                        <div onClick={toggleAccountModal} className="popover__item">
                            Редактировать
                        </div>
                        <div onClick={() => alert('Alert placeholder')} className="popover__item">
                            Удалить
                        </div>
                    </div>
                </Typography>
            </Popover>

            <Dialog
                open={accountModal}
                onClose={toggleAccountModal}
                maxWidth="md"
                fullWidth
            >
                <AccountModal/>
            </Dialog>
        </div>
    );
};

export default SettingsElement;
