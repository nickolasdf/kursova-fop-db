import React from "react";
import SearchIcon from "../Icons/SearchIcon";
import "./style.scss";

const SearchInput = () => (
    <div className="search-block">
        <input
            className="search-input"
            type="text"
            placeholder="Найти..."
        />
        <span className="search-icon">
            <SearchIcon />
        </span>
    </div>
);

export default SearchInput;
