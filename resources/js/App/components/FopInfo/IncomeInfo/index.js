import React from "react";
import "./index.scss";
import { Button, Dialog } from "@material-ui/core";
import IncomeTable from "./IncomeTable";
import useModal from "../../../config/hooks/useModal";
import CreateIncomeForm from "../CreateIncomeForm";

const IncomeInfo = ({ fopData, getFopData }) => {
    const incomeModal = useModal();

    return (
        <div>
            <br />
            <div className="income-info__header">
                <div><h2>Таблиця доходів</h2></div>
                <div>
                    <Button variant="contained" color="primary" onClick={incomeModal.openModal}>
                        Створити дохід
                    </Button>
                </div>
            </div>
            <br />
            <IncomeTable data={fopData.fop_incomes} />
            <Dialog open={incomeModal.open} onClose={incomeModal.closeModal} fullWidth={true} maxWidth="sm">
                <CreateIncomeForm id={fopData.id} updateFopData={getFopData} onClose={incomeModal.closeModal}/>
            </Dialog>
        </div>
    )
};

export default IncomeInfo;