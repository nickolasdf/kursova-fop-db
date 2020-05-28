import React from "react";
import Button from "../Button";
import { ImportIcon, ExportIcon, FilterIcon } from "../Icons";
import { IncomeIcon, ExpenseIcon, TransferIcon } from "../Icons";
import "./style.scss";

const ButtonGroup = props => {
    return (
        <div className="btn-group">
            <div
                className="btn-group__item"
                onClick={ props.openForm(0) }
            >
                <Button
                    title="Расходы"
                    icon={<ExpenseIcon />}
                    className="btn--primary expense_btn"
                />
            </div>
            <div
                className="btn-group__item"
                onClick={ props.openForm(1) }
            >
                <Button
                    title="Доходы"
                    icon={<IncomeIcon />}
                    className="btn--primary income_btn"
                />
            </div>
            <div
                className="btn-group__item"
                onClick={ props.openForm(2) }
            >
                <Button
                    title="Перевод"
                    icon={<TransferIcon />}
                    className="btn--primary transfer_btn"
                />
            </div>
            <div className="btn-group__item exp_imp_wrapper">
                <Button className="dashboard_import_btn" title="импорт" styles="btn--txt" icon={<ImportIcon />} />
                <Button className="dashboard_export_btn" title="экспорт" styles="btn--txt" icon={<ExportIcon />}/>
            </div>
            <div className="btn-group__item filter_btn_wrapper">
                <Button className="dashboard_filter_btn" title="фильтр" styles="btn--txt" icon={<FilterIcon />} />
            </div>
        </div>
    );
};

export default ButtonGroup;
