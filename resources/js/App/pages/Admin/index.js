import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import './index.scss';
import FopList from '../../components/Admin/FopList';
import useModal from '../../config/hooks/useModal';
import FopForm from '../../components/FopForm';
import { getFops } from '../../reducers/FopList/actions';
import requests from "../../requests";
import TaxesList from "../../components/Admin/TaxesList";
import TaxesForm from "../../components/TaxesForm";

const Admin = () => {
    const [taxes, setTaxes] = useState([]);

    const dispatch = useDispatch();
    const fops = useSelector(state => state.FopList);
    const fopModal = useModal();
    const taxesModal = useModal();

    useEffect(() => {
        dispatch(getFops());
        getTaxes();
    }, []);

    const getTaxes = () => {
        requests.Tax.getAll().then(resp => {
            setTaxes(resp.data)
        })
    };

    return (
        <div>
            <div className="fop-list__header">
                <div>
                    <h1>Податки</h1>
                </div>
                <div>
                    <Button variant="contained" color="primary" className="add-fop-btn" onClick={taxesModal.openModal}>
                        Редагувати податки
                    </Button>
                </div>
            </div>
            <br />
            <TaxesList data={taxes}/>
            <br />
            <br />
            <div className="fop-list__header">
                <div>
                    <h1>Список ФОПів</h1>
                </div>
                <div>
                    <Button variant="contained" color="primary" className="add-fop-btn" onClick={fopModal.openModal}>
                        Додати ФОПа
                    </Button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <FopList data={fops.data}/>
            <Dialog open={fopModal.open} onClose={fopModal.closeModal} fullWidth={true} maxWidth="sm">
                <FopForm onClose={fopModal.closeModal}/>
            </Dialog>
            <Dialog open={taxesModal.open} onClose={taxesModal.closeModal} fullWidth={true} maxWidth="sm">
                <TaxesForm onClose={taxesModal.closeModal} updateTaxes={getTaxes} taxes={taxes}/>
            </Dialog>
        </div>
    );
};

export default Admin;
