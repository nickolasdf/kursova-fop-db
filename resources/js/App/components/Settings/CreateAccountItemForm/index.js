import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { throwAlert } from '../../../reducers/App/actions';
import { SUCCESS } from '../../../config/alertVariants';
import Input from '../../custom/Input';
import FormActionGroup from '../../FormActionGroup';
import Select from '../../custom/Select';
import ColorPicker from '../../custom/ColorPicker';
import requests from '../../../requests';
import { getAccountItems } from '../../../reducers/AccountItems/actions';
import IconPicker from '../../custom/IconPicker';
import './index.scss';
import ArticleIcon from '../../Icons/ArticleIcon';

const styles = {
    mainIcon: {
        width: 150,
        height: 150,
        borderRadius: '100%'
    }
};

const widgets = [
    {
        value: 'office',
        label: 'Office'
    },
    {
        value: 'customer',
        label: 'Customer'
    },
    {
        value: 'user',
        label: 'User'
    },
    {
        value: null,
        label: 'Отсутствует'
    }
];

const CreateAccountItemForm = props => {
    const {
        onClose,
        accountItemId,
        parentId,
        onSubmit
    } = props;

    const [additionalStuff, setAdditionalStuff] = useState({ icons: [], colors: [] });
    const [defaultColor, setDefaultColor] = useState('');
    const [defaultIcon, setDefaultIcon] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        color: '',
        icon: '',
        widget: '',
        description: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Название обязательно'),
        color: Yup.string().notRequired(),
        widget: Yup.string().notRequired()
    });

    useEffect(() => {
        getAdditionalStuff();
    }, []);

    const getAdditionalStuff = () => {
        requests.AccountItem.getAdditionalStuff().then(resp => {
            setAdditionalStuff(resp.data);
        });
    };

    const getAccountItemData = (id, setValues) => {
        requests.AccountItem.getOne(id).then(resp => {
            setValues({
                name: resp.data.name,
                color: resp.data.color,
                icon: resp.data.icon,
                widget: {
                    value: resp.data.widget.toLowerCase(),
                    label: resp.data.widget
                },
                description: resp.data.description ? resp.data.description : ''
            });
            setDefaultColor(resp.data.color);
            setDefaultIcon(resp.data.icon);
        });
    };

    const handleSelectWidget = setValue => value => {
        setValue('widget', value);
    };

    const handlePickColor = setValue => value => {
        setValue('color', value);
    };

    const handlePickIcon = setValue => value => {
        setValue('icon', value);
    };

    const submitForm = values => {
        setSubmitting(true);
        if (accountItemId) {
            const formData = {
                ...values,
                widget: values.widget.value
            };
            requests.AccountItem.update(accountItemId, formData).then(() => {
                onClose();
                dispatch(throwAlert(SUCCESS, 'Статья успешно обновлена'));
                dispatch(getAccountItems());
            }).catch(() => setSubmitting(false));
        } else {
            const formData = {
                ...values,
                widget: values.widget.value,
                parent_id: parentId ? parentId : null
            };
            requests.AccountItem.add(formData).then(resp => {
                const { data } = resp.data;
                if (onSubmit) {
                    onSubmit(data);
                }
                onClose();
                dispatch(throwAlert(SUCCESS, 'Статья успешно создана'));
                dispatch(getAccountItems());
            }).catch(() => setSubmitting(false));
        }
    };

    return (
        <Formik
            onSubmit={submitForm}
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {
                ({
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                    errors,
                    touched,
                    handleBlur,
                    values,
                    setValues
                }) => {
                    useEffect(() => {
                        if (accountItemId) {
                            getAccountItemData(accountItemId, setValues);
                        }
                    }, []);

                    const newColors = defaultColor ? [defaultColor, ...additionalStuff.colors] : additionalStuff.colors;
                    const newIcons = defaultIcon ? [defaultIcon, ...additionalStuff.icons] : additionalStuff.icons;

                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="form_wrapper">
                                <div className="form_title">{accountItemId ? 'Редактировать статью' : 'Новая статья'}</div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Название</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.name}
                                                placeholder="Название статьи"
                                                onChange={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                isError={errors.name && touched.name}
                                                errorMessage={errors.name}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Описание</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Input
                                                value={values.description}
                                                placeholder="Не обязательно"
                                                onChange={handleChange('description')}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row">
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Тип</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Select
                                                value={values.widget}
                                                placeholder="Офис"
                                                options={widgets}
                                                onChange={handleSelectWidget(setFieldValue)}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row form_color_picker">
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <span>Цвет</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <ColorPicker
                                                value={values.color}
                                                colors={newColors}
                                                onChange={handlePickColor(setFieldValue)}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="form_row form_icon_picker">
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <ArticleIcon
                                                color={values.icon ? values.color : ''}
                                                iconId={values.icon}
                                                wrapperStyles={styles.mainIcon}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <IconPicker
                                                value={values.icon}
                                                color={values.color}
                                                icons={newIcons}
                                                onChange={handlePickIcon(setFieldValue)}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <FormActionGroup
                                onClose={onClose}
                                isSubmitting={submitting}
                                buttonDisabled={submitting}
                            />
                        </form>
                    );
                }
            }
        </Formik>
    );
};

export default CreateAccountItemForm;
