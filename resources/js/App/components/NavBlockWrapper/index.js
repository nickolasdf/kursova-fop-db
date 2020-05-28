import React, { useState } from 'react';
import './index.scss';
import MenuCardIcon from '../Icons/MenuCardIcon';
import { Collapse, IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

const height = 60;

const styles = {
    openBlock: {
        transform: 'rotate(180deg)'
    }
};

const NavBlockWrapper = props => {
    const {
        children,
        title,
        component,
        isHide,
        classes,
        menuList = [],
        onItemClick = () => {
        },
        onOpenMenu = () => {
        },
        generalClickHandler = () => {
        },
        hideMenu = false
    } = props;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const onOpen = () => {
        setOpen(!open);
    };

    const handleClickMenu = event => {
        generalClickHandler();

        onOpenMenu();
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.07)'
            }}
        >
            <div className="nav_block_header">
                {
                    title &&
                    <div className="nav_block_title">{title}</div>
                }
                <div style={{ flex: '1 1 auto' }}>{component}</div>
                {/* Show menu icon or not */}
                {hideMenu ? null :
                    <div>
                    <span>
                        {
                            isHide &&
                            <IconButton
                                size="small"
                                onClick={onOpen}
                                className={clsx({
                                    [classes.openBlock]: open
                                })}
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                        }
                    </span>
                        <span>
                        <IconButton size="small" onClick={handleClickMenu}>
                            <MenuCardIcon/>
                        </IconButton>
                            {
                                menuList.length > 0 &&
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    getContentAnchorEl={null}
                                >
                                    {
                                        menuList.map(item => {
                                            const selected = {
                                                label: item.label,
                                                value: item.value
                                            };
                                            return (
                                                <MenuItem
                                                    key={item.value}
                                                    onClick={() => {
                                                        handleCloseMenu();
                                                        onItemClick(selected);
                                                    }}
                                                >
                                                    {item.label}
                                                </MenuItem>
                                            );
                                        })
                                    }
                                </Menu>
                            }
                    </span>
                    </div>}

            </div>
            <div
                style={{
                    flex: '1 1 auto',
                    background: 'white',
                    width: '100%',
                    height: `calc(100% - ${height}px)`
                }}
            >
                {
                    isHide ?
                        <Collapse in={open}>{children}</Collapse>
                        :
                        <>{children}</>
                }
            </div>
        </div>
    );
};

export default withStyles(styles)(NavBlockWrapper);
