import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import './index.scss';
import FopList from '../../components/Admin/FopList';
import useModal from '../../config/hooks/useModal';
import FopForm from '../../components/FopForm';
import { getFops } from '../../reducers/FopList/actions';

const Admin = () => {
    const dispatch = useDispatch();
    const fops = useSelector(state => state.FopList);
    const fopModal = useModal();

    useEffect(() => {
        dispatch(getFops());
    }, []);

    return (
        <div>
            <h1>Список ФОПів</h1>
            <br/>
            <Button variant="contained" color="primary" className="add-fop-btn" onClick={fopModal.openModal}>
                Додати ФОПа
            </Button>
            <br/>
            <br/>
            <br/>
            <FopList data={fops.data}/>
            <Dialog open={fopModal.open} onClose={fopModal.closeModal} fullWidth={true} maxWidth="sm">
                <FopForm onClose={fopModal.closeModal}/>
            </Dialog>
        </div>
    );
};

export default Admin;
