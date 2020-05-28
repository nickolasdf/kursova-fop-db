import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./VacancyEditForm.scss";
import Select from "../../components/Select";
import Button from "../../components/Button";
import requests from "../../requests";
import { connect } from "react-redux";
import { throwAlert } from "../../reducers/App/actions";
import {
    addVacancy,
    editVacancy,
    deleteVacancy
} from "../../reducers/Vacancies/actions";
import { SUCCESS } from "../../config/alertVariants";

const selectStyles = {
    currency: {
        width: "100%"
    },
    employment: {
        width: "100%"
    }
};

const VacancyEditForm = props => {
    const {
        data,
        onClose,
        throwAlert,
        addVacancy,
        cities,
        user,
        editVacancy,
        deleteVacancy,
        currencies,
        employmentTypes
    } = props;

    const [form, setForm] = useState({
        vacancyId: data.id,
        title: data.title,
        description: data.description,
        employment: { value: data.employment_id, label: data.employment },
        salaryFrom: data.salary_from,
        salaryTo: data.salary_to,
        currency: { value: data.currency_id, label: data.currency },
        city: data.city,
        number: data.number
    });

    const citiesOptions = cities.data.map(city => ({
        label: city.name,
        value: city.id
    }));

    const cityDefaultOption = {
        label: data.city,
        value: data.city_id
    };

    const currenciesOptions = currencies.data.map(currency => ({
        label: currency.value,
        value: currency.id
    }));

    const employmentTypesOptions = employmentTypes.data.map(type => ({
        label: type.value,
        value: type.id
    }));

    const handleChangeText = name => event => {
        setForm({
            ...form,
            [name]: event.target.value
        });
    };

    const handleSelect = name => value => {
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleDeleteVacancy = event => {
        event.preventDefault();
        deleteVacancy(data.id);
        throwAlert(SUCCESS, "Вакансия удалена");
        onClose();
    };

    const closeModal = e => {
        e.preventDefault();
        onClose();
    };

    const addVac = e => {
        e.preventDefault();
        const formData = {
            id: form.vacancyId,
            title: form.title,
            description: form.description,
            employment_id: form.employment.value,
            salary_from: Number(form.salaryFrom),
            salary_to: Number(form.salaryTo),
            currency_id: form.currency.value,
            city_id: form.city.value ? form.city.value : data.city_id,
            city: form.city.label ? form.city.label : data.city,
            number: form.number,
            owner: user.name,
            owner_id: user.id
        };
        if (Object.keys(data).length > 0) {
            editVacancy(formData.id, formData);
            throwAlert(SUCCESS, "Вакансия отредактирована");
        } else {
            addVacancy(formData);
            throwAlert(SUCCESS, "Вакансия создана");
        }

        onClose();
    };

    return (
        <form className="vacancy_edit_form">
            <div className="form_row">
                <input
                    className="vacancy_name"
                    placeholder="Вакансия"
                    value={form.title}
                    onChange={handleChangeText("title")}
                />
            </div>
            <div className="form_row description_row">
                <textarea
                    placeholder="Описание"
                    rows={18}
                    value={form.description}
                    onChange={handleChangeText("description")}
                />
            </div>
            <div className="form_row">
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <span>Зарплата</span>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="amount_with_currency_wrapper">
                            <Grid container>
                                <Grid item xs={4}>
                                    <input
                                        type="number"
                                        placeholder="от"
                                        value={form.salaryFrom}
                                        onChange={handleChangeText(
                                            "salaryFrom"
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <input
                                        className="salary_to_input"
                                        type="number"
                                        placeholder="до"
                                        value={form.salaryTo}
                                        onChange={handleChangeText("salaryTo")}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Select
                                        controlStyles={selectStyles.currency}
                                        options={currenciesOptions}
                                        value={form.currency}
                                        placeholder="Валюта..."
                                        onChange={handleSelect("currency")}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="form_row">
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <span>Город</span>
                    </Grid>
                    <Grid item xs={8}>
                        {/* <input
                            value={form.city}
                            onChange={handleChangeText("city")}
                        /> */}
                        <Select
                            // controlStyles={selectStyles.currency}
                            options={citiesOptions}
                            defaultValue={cityDefaultOption.value}
                            defaultInputValue={data.city}
                            value={form.city}
                            placeholder="Город..."
                            onChange={handleSelect("city")}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className="form_row">
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <span>Вид занят.</span>
                    </Grid>
                    <Grid item xs={8}>
                        <Select
                            options={employmentTypesOptions}
                            controlStyles={selectStyles.employment}
                            value={form.employment}
                            onChange={handleSelect("employment")}
                            placeholder="Введите вид занятости"
                        />
                    </Grid>
                </Grid>
            </div>
            <div className="form_row">
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <span>К-тво позиций</span>
                    </Grid>
                    <Grid item xs={8}>
                        <input
                            type="number"
                            value={form.number}
                            onChange={handleChangeText("number")}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className="actions_wrapper">
                <div className="display-flex">
                    <Button
                        title="сохранить"
                        styles={"btn--primary"}
                        onClick={addVac}
                    />
                    <Button
                        title="отменить"
                        styles={"btn--txt"}
                        onClick={closeModal}
                    />
                </div>
                {Object.keys(data).length > 0 ? (
                    <button
                        className="delete_btn"
                        onClick={handleDeleteVacancy}
                    >
                        удалить
                    </button>
                ) : null}
            </div>
        </form>
    );
};

const mapDispatchToProps = {
    throwAlert,
    addVacancy,
    editVacancy,
    deleteVacancy
};

export default connect(null, mapDispatchToProps)(VacancyEditForm);
