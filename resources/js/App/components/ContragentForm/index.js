import React from "react";
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Select from "react-select";
import "./style.scss";
import requests from "../../requests";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { throwAlert } from "../../reducers/App/actions";
import {formValid, validatorMessage} from "./utils";

const styles = {
    paper: {
        overflow: "unset"
    }
};

const selectTheme = theme => ({
    ...theme,
            borderRadius: 0,
            colors: {
        ...theme.colors,
                primary25: '#ffd63c',
                primary: '#ffd63c'
        },
});
const selectOptions = [
    { value: "1", label: "Example - 1" },
    { value: "2", label: "Example - 2" },
    { value: "3", label: "Example - 3" },
    { value: "4", label: "Example - 4" },
    { value: "5", label: "Example - 5" },
    { value: "6", label: "Example - 6" }
];

const customStyles = {
    control: () => ({
        display: "flex",
        alignItems: "center",
        border: "solid 1px #e0e0e0",
        width: "100%",
        minHeight: "40px",
        marginTop: "-1px",
        backgroundColor: "white"
    }),
};

class ContragentForm extends React.Component {
    state = {
        form: {
            ...{
                name: "",
                description: "",
                balance: "",
                contact: "",
                phone: "",
                email: "",
                mutual: "",
                projects: [],
                type: "",
                period: "",
                amount: ""
            },
            ...this.props.formData
        },
        formErrors: {
            name: "",
            description: "",
            balance: "",
            contact: "",
            phone: "",
            email: "",
            mutual: "",
            projects: [],
            type: "",
            period: "",
            amount: ""
        },
        projects: [],
    };

    setForm = (name, value) => {
        const { formErrors, form } = this.state;
        this.setState({
            form: { ...form, [name]: value },
            formErrors: { ...formErrors, [name]: validatorMessage(value, name)}
        })
    };
    handleChange = (name) => event => {
        const { value } = event.target;
        this.setForm(name, value);
    };
    handleSelectChange = name => item => {
        this.setForm(name, item.value);
    };
    handleMultiSelectChange = name => items => {
        this.setForm(name, items)
    };
    handleInputChange = name => value => {
       let current = this;
       if(value){
           requests.Autocomplete.get('/' + name + '/search', { params: { query: value } })
               .then(function (resp) {
                   current.setState({[name]:  resp.data})
               });
       }

    };
    handleSubmit = event => {
        event.preventDefault();
        const { form } = this.state;
        const { isValid, newFormErrors } = formValid(form);

        if(isValid) {
            const { name, contact, phone, email, balance, id, projects } = this.state.form;
            const { getCustomersData, closeForm, tableConfig, throwAlert, type } = this.props;
            const config = {
                order_field: tableConfig.orderBy,
                order_type: tableConfig.order.toUpperCase(),
                per_page: tableConfig.rowsPerPage,
                page: tableConfig.page + 1,
            };
            const data = {
                name,
                contact,
                phone,
                email,
                projects: projects ? projects.map(item => item.value) : [],
                total: balance
            };
            if(type === "edit") {
                requests.Customer.update(id, data).then(resp => {
                    getCustomersData(config);
                    throwAlert("success", "Оновлено");
                    closeForm();
                })
            }
            if(type === "create") {
                requests.Customer.add(data)
                    .then(resp => {
                        if(resp) {
                            getCustomersData(config);
                            throwAlert("success", "Створено");
                            closeForm();
                            this.props.updateData(); // TODO Микола потестуй це
                        }
                    })
            }
        }
        else {
            this.setState({ formErrors: newFormErrors });
        }


    };
    render() {
        const { form, formErrors } = this.state;
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={ this.props.closeForm }
                maxWidth={false}
                classes={{ paper: this.props.classes.paper }}
            >
                <form className="contragent_form" onSubmit={this.handleSubmit}>
                    <Grid className="form_grid_container" alignItems="center" container>
                        <Grid item xs={12}>
                            {
                                formErrors.name.length > 0 ?
                                    <span className="error_message">{ formErrors.name }</span> :
                                    null
                            }
                            <input
                                value={form.name}
                                onChange={this.handleChange("name")}
                                className="contragent_name_input"
                                type="text"
                                placeholder="ПІБ"
                            />
                        </Grid>
                        <Grid item xs={12} className="textarea_container">
                            {
                                formErrors.description.length > 0 ?
                                    <span className="error_message">{ formErrors.description }</span> :
                                    null
                            }
                            <textarea
                                value={form.description}
                                onChange={this.handleChange("description")}
                                className="contragent_description_input"
                                placeholder="Опис"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <div><span>Баланс</span></div>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.balance.length > 0 ?
                                    <span className="error_message">{ formErrors.balance }</span> :
                                    null
                            }
                            <input
                                value={form.balance}
                                className="input_item"
                                onChange={this.handleChange("balance")}
                                placeholder="0"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Контакт</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.contact.length > 0 ?
                                    <span className="error_message">{ formErrors.contact }</span> :
                                    null
                            }
                            <input
                                value={form.contact}
                                className="input_item"
                                onChange={this.handleChange("contact")}
                                placeholder="Не вказаний"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Телефон</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.phone.length > 0 ?
                                    <span className="error_message">{ formErrors.phone }</span> :
                                    null
                            }
                            <input
                                value={form.phone}
                                className="input_item"
                                onChange={this.handleChange("phone")}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Пошта</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.email.length > 0 ?
                                    <span className="error_message">{ formErrors.email }</span> :
                                    null
                            }
                            <input
                                value={form.email}
                                className="input_item"
                                onChange={this.handleChange("email")}
                                placeholder="Не вказана"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Взаєморозрахунок</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.mutual.length > 0 ?
                                    <span className="error_message">{ formErrors.mutual }</span> :
                                    null
                            }
                            <Select
                                onChange={this.handleSelectChange("mutual")}
                                styles={customStyles}
                                options={selectOptions}
                                theme={selectTheme}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Проект</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.projects.length > 0 ?
                                    <span className="error_message">{ formErrors.projects }</span> :
                                    null
                            }
                            <Select
                                defaultValue={form.projects}
                                isMulti={true}
                                onInputChange={this.handleInputChange("projects")}
                                onChange={this.handleMultiSelectChange("projects")}
                                styles={customStyles} options={this.state.projects}
                                theme={selectTheme}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Тип</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.type.length > 0 ?
                                    <span className="error_message">{ formErrors.type }</span> :
                                    null
                            }
                            <Select
                                onChange={this.handleSelectChange("type")}
                                styles={customStyles}
                                options={selectOptions}
                                theme={selectTheme}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Кількість</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.amount.length > 0 ?
                                    <span className="error_message">{ formErrors.amount }</span> :
                                    null
                            }
                            <Select
                                onChange={this.handleSelectChange("amount")}
                                styles={customStyles}
                                options={selectOptions}
                                theme={selectTheme}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <span>Період</span>
                        </Grid>
                        <Grid item xs={8}>
                            {
                                formErrors.period.length > 0 ?
                                    <span className="error_message">{ formErrors.period }</span> :
                                    null
                            }
                            <Select
                                onChange={this.handleSelectChange("period")}
                                styles={customStyles}
                                options={selectOptions}
                                theme={selectTheme}
                            />
                        </Grid>
                    </Grid>
                    <div className="form_actions">
                        <button type="submit" className="action_btn">СОХРАНИТЬ</button>
                        <button type="button" className="action_btn" onClick={this.props.closeForm}>ОТМЕНИТЬ</button>
                    </div>
                </form>
            </Dialog>
        )
    }
}

const mapStateToProps = ({Contragents}) => ({
    tableConfig: Contragents.tableConfig,
});
const mapDispatchToProps = {
    throwAlert
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ContragentForm));
