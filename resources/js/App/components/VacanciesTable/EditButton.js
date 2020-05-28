import React from "react";
import { connect } from "react-redux";
import ContragentForm from "../ContragentForm"

const EditButton = props => {
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const { contragent } = props;
    const data = {
        balance: contragent.balance,
        contact: contragent.contact,
        id: contragent.id,
        name: contragent.name,
        email: contragent.email,
        phone: contragent.phone,
        projects: contragent.projects
    };
    const handleClickClose = () => {
        setIsFormOpen(false)
    };
    const handleClickOpen = () => {
        setIsFormOpen(true)
    };
    return(
        <>
            <button onClick={ handleClickOpen }>Edit</button>
            <ContragentForm getCustomersData={props.getCustomersData} isOpen={isFormOpen} closeForm={handleClickClose} type="edit" formData={data} />
        </>
    )
};

export default EditButton;
