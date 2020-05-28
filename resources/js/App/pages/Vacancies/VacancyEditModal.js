import React from "react";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import VacancyEditForm from "./VacancyEditForm";
import { createEnumData } from "../../config/selectOptions";

const styles = {
    dialog: {
        minWidth: "85vw",
        minHeight: "85vh",
        overflow: "unset"
    }
};

const VacancyEditModal = ({
    data = {},
    isOpen,
    onClose = null,
    classes,
    cities,
    user,
    currencyList,
    employmentList,
    currencies,
    employmentTypes
}) => {
    const currencySelectOptions = createEnumData(currencyList);
    const employmentSelectOptions = createEnumData(employmentList);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            classes={{ paper: classes.dialog }}
        >
            <VacancyEditForm
                {...{
                    currencySelectOptions,
                    employmentSelectOptions,
                    data,
                    onClose,
                    cities,
                    user,
                    currencies,
                    employmentTypes
                }}
            />
        </Dialog>
    );
};

export default withStyles(styles)(VacancyEditModal);
