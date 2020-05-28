import React from "react";
import "./style.scss";
import Select from "react-select";

const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    backgroundColor: '#f9f9f9!important',
    colors: {
        ...theme.colors,
        primary25: '#ffd63c',
        primary: '#ffd63c'
    },
});

// const selectTheme = theme => ({
//     ...theme,
//     borderRadius: 0,
//     colors: {
//         ...theme.colors,
//         primary25: '#ffd63c',
//         primary: '#ffd63c'
//     },
// });


const defaultStyles = {
    control: (base, state) => ({
        ...base,
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    })
};


const SelectField = ({ label = null, options = {}, defaultValue="", isMulti = false, styles = { defaultStyles } , value= {} }) => (
    <div className="profile-select-field__container">
        {!label ||
            <label className="profile-select-field__label">{label}</label>
        }
        <Select defaultValue={defaultValue} isMulti={isMulti} options={options} theme={selectTheme} styles={defaultStyles} value={value} />
    </div>
);

export default SelectField;
