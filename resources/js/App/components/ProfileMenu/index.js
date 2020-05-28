import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LogOutButton from "../LogOutButton";
import ArrowDown from "../Icons/ArrowDown";
import IconButton from "@material-ui/core/IconButton";
import "./style.scss";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="profile_menu_btn">
                <IconButton aria-haspopup="true" onClick={handleClick}>
                    <ArrowDown />
                </IconButton>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to={`/profile/edit`}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>
                    <LogOutButton />
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;
