import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.scss';
import FormActionGroup from '../../../../FormActionGroup';
import Select from '../../../../custom/Select';
import requests from '../../../../../requests';
import { createCustomersData } from '../../../../../config/selectOptions';
import { getCustomers } from '../../../../../reducers/Customers/actions';
import { getIds } from '../../../../../config/constants';

const CombineCustomersForm = ({ selected, onClose, clearSelected }) => {
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [customer, setCustomer] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        const selectOptions = createCustomersData(selected);
        setSelectedCustomers(selectOptions);
        setCustomer(selectOptions[0]);
    }, [selected]);

    const combineSelected = event => {
        event.preventDefault();
        const requestParams = {
            ids: getIds(selected),
            merge_to: customer.value
        };
        console.log(requestParams);
        requests.Customer.merge({ params: requestParams }).then(() => {
            clearSelected();
            dispatch(getCustomers());
            onClose();
        });
    };

    const handleSelect = item => {
        setCustomer(item);
    };

    return (
        <form onSubmit={combineSelected}>
            <div className="form_wrapper">
                <div className="form_title">Выберите куда объединить</div>
                <Select options={selectedCustomers} onChange={handleSelect} value={customer}/>
            </div>
            <FormActionGroup onClose={onClose}/>
        </form>
    );
};

export default CombineCustomersForm;
