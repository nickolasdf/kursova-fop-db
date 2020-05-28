import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { throwAlert } from '../../../reducers/App/actions';
import { SUCCESS } from '../../../config/alertVariants';
import requests from '../../../requests';
import { Formik } from 'formik';
import WrappedCustomerForm from './WrappedCustomerForm';
import { getCustomers } from '../../../reducers/Customers/actions';
import './index.scss';

const CustomerForm = props => {
    const {
        data = {
            id: null,
            name: '',
            description: '',
            contact: '',
            phone: '',
            email: ''
        },
        onClose,
        handleSubmit
    } = props;

    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        contact: '',
        phone: '',
        email: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.id) {
            setInitialValues({
                name: data.name,
                description: data.description,
                contact: data.contact,
                phone: data.phone,
                email: data.email
            });
        }
    }, [data]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Імя обязательное'),
        phone: Yup.string().min(13, 'Некоректный номер').required('Телефон обязательный'),
        email: Yup.string().email('Некоректная почта').required('Почта обязательна')
    });

    const submitForm = values => {
        setSubmitting(true);
        if (data.id) {
            requests.Customer.update(data.id, values).then((resp) => {
                dispatch(throwAlert(SUCCESS, 'Контрагент отредактирован'));
                onClose();
                if (handleSubmit && typeof handleSubmit === 'function') {
                    handleSubmit(resp.data);
                }
            });
        } else {
            requests.Customer.add(values).then((resp) => {
                dispatch(throwAlert(SUCCESS, 'Контрагент создан'));
                dispatch(getCustomers());
                onClose();
                if (handleSubmit && typeof handleSubmit === 'function') {
                    handleSubmit(resp.data.data);
                }
            });
        }
    };

    return (
        <Formik
            onSubmit={submitForm}
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
        >
            {formikProps => (
                <WrappedCustomerForm
                    {...formikProps}
                    closeModal={onClose}
                    data={data}
                    submitting={submitting}
                />
            )}
        </Formik>
    );
};

export default CustomerForm;
