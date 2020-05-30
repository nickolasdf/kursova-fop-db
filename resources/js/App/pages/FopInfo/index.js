import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./index.scss";
import requests from "../../requests";
import FopCard from "../../components/FopInfo/FopCard";
import IncomeInfo from "../../components/FopInfo/IncomeInfo";
import TaxesInfo from "../../components/FopInfo/TaxesInfo";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Button, Dialog} from "@material-ui/core";
import FopForm from "../../components/FopForm";
import useModal from "../../config/hooks/useModal";

const FopInfo = () => {
    const { id } = useParams();
    const [fopInfo, setFopInfo] = useState({});
    const fopModal = useModal();

    useEffect(() => {
        getFopInfo(id)
    }, []);

    const getFopInfo = id => {
        requests.Fop.getFopInfo(id).then(resp => {
            setFopInfo(resp.data);
        })
    };

    return (
        <div>
            <Link to="/admin">
                <ArrowBackIcon />
                На головну
            </Link>
            <br />
            <br />
            <FopCard data={fopInfo} />
            <br />
            <Button variant="contained" color="primary" onClick={fopModal.openModal}>Редагувати</Button>
            <br />
            <IncomeInfo fopData={fopInfo} getFopData={() => getFopInfo(id)}/>
            <br />
            <TaxesInfo fopData={fopInfo}/>
            <Dialog
                open={fopModal.open}
                onClose={fopModal.closeModal}
                fullWidth={true}
                maxWidth="sm"
            >
                <FopForm onClose={fopModal.closeModal} isEdit={true} defaultData={fopInfo} updateData={() => getFopInfo(id)}/>
            </Dialog>
        </div>
    )
};

export default FopInfo;