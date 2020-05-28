import React, {useState} from "react";
import clsx from "clsx";
import CurrencyForm from "./CurrencyForm";

const CurrencyWrapper = props => {
    const {
        id,
        updateCurrency,
        rate,
        currencySymbol
    } = props;

    const [isEditable, setIsEditable] = useState(false);

    const handleClickEdit = isEdit => () => {
        setIsEditable(isEdit)
    };

    return (
        <div className={clsx("currency_input_wrapper", isEditable ? "editable" : null)} onMouseDown={handleClickEdit(true)}>
            <span className="dashboard_currency_label">{currencySymbol}</span>
            <div className="currency_rate_wrapper">
                {
                    isEditable ?
                       <CurrencyForm {...{ rate, id, updateCurrency }} closeEdit={handleClickEdit(false)} /> :
                        <span>{rate}</span>
                }
            </div>
        </div>
    )
};

export default CurrencyWrapper;
