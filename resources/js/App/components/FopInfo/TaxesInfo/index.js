import React from "react";
import "./index.scss";
import TaxesTable from "./TaxesTable";

const TaxesInfo = ({ fopData }) => {

    return (
        <div>
            <br />
            <div className="income-info__header">
                <div><h2>Таблиця податків</h2></div>
            </div>
            <br />
            <TaxesTable data={fopData.fop_taxes}/>
        </div>
    )
};

export default TaxesInfo;