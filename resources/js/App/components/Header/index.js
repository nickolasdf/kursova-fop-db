import React, { memo } from "react";
import "./style.scss";
import SearchInput from "../SearchInput";
import ProfileMenu from "../ProfileMenu";
import CurrencyBox from "../CurrencyBox";
import { useLocation } from "react-router-dom";
import ShortUserInfo from "./ShortUserInfo";

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <nav>
                <div className="header__search-input nav_item">
                    <SearchInput />
                </div>
                <div className="nav_item">
                    {location.pathname === "/dashboard" ? (
                        <div className="currency_wrapper">
                            <CurrencyBox />
                        </div>
                    ) : null}
                </div>
                <div className="user_info_block nav_item">
                    <ShortUserInfo />
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    );
};

export default memo(Header);
