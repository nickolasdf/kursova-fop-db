import React from "react";
import "./style.scss";
import DefaultModalBody from "../../../DefaultModal/DefaultModalBody";
import DefaultModalControls from "../../../DefaultModal/DefaultModalControls";
import Grid from "@material-ui/core/Grid/Grid";
import connect from "react-redux/es/connect/connect";
import DefaultTooltip from "../../../DefaultTooltip";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import Check from "@material-ui/icons/Check";
import Select from "react-select";

const styles = theme => ({
    colorContainer: {
        position: "relative",
        width: "100%",
        paddingTop: "100%",
    },
    colorItem: {
        position:  "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

const customStylesWhite = {
    control: (base, state) => ({
        ...base,
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
    }),
    menuList: base => ({
        ...base,
        padding: 0,
    })
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

class AccountForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            selectedColorIndex: -1,
        };
    }


    handleSubmit = (values) => {

        console.log(this.props.model)
        console.log(this.props.model)

        const data = {
            id: this.props.model.id,
            parent_id: values.parent_id ? values.parent_id.value : null,
            name: values.name,
            widget: values.widget? values.widget.label : null,
            color: (this.state.selectedColorIndex !== -1) ? this.state.colors[this.state.selectedColorIndex] : null,

        };

        this.props.handleSubmit(data);
    };

    fetchColors = () => {
        axios
            .get(`/api/account-item/get/colors`)
            .then(res => {
                if ( this.props.model.color) {
                    res.data.unshift(this.props.model.color)
                    this.setState({
                        colors: res.data,
                        selectedColorIndex: 0
                    })
                } else {
                    this.setState({ colors: res.data })
                }
            })
            .catch(error => {

            });
    };

    componentDidMount() {
        this.fetchColors();
    }

    handleSelectColor = (index) => {
        this.setState({ selectedColorIndex: index })
    };

    render() {

        const { colors = [] } = this.state;
        const { model = { } } = this.props;
        const { allAccountsList = [] } = this.props;
        const { account_item_widget = [] } = this.props;
        const { name = "" } = model;
        const { color = "" } = model;
        const { widget = "" } = model;
        const { parent_id = "" } = model;

        const { classes } = this.props;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={
                    {
                        name,
                        color,
                        widget: account_item_widget.filter( _widget => _widget.label === widget)[0],
                        parent_id: allAccountsList.filter( _parent => _parent.value === parent_id)[0],
                    }
                }
                onSubmit={(values, { setSubmitting }) => {
                    this.handleSubmit(values)
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required("Обязательное поле название статьи"),
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        setFieldTouched,
                        setFieldValue,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <form className="project-form__container" onSubmit={handleSubmit}>
                            <DefaultModalBody>
                                <Grid alignItems="center" container>
                                    <Grid item sm ={2} xs={12}>
                                        <label>Родительская</label>
                                    </Grid>
                                    <Grid item sm={10} xs={12}>
                                        <div className="input-wrapper">
                                            <Select
                                                onChange={ (item) => setFieldValue("parent_id", item)}
                                                onBlur={ () => {
                                                    setFieldTouched("parent_id", true);
                                                }}
                                                onFocus={() => {
                                                    setFieldTouched("parent_id", false);
                                                }}
                                                value={values.parent_id}
                                                styles={customStylesWhite}
                                                options={allAccountsList}
                                                theme={selectTheme}
                                                placeholder={"Родительская статья"}
                                                maxMenuHeight={180}
                                                isClearable={true}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid alignItems="center" container>
                                    <Grid item sm ={2} xs={12}>
                                    <label>Статья</label>
                                </Grid>
                                    <Grid item sm={10} xs={12}>
                                        <div className="input-wrapper">
                                            <input
                                                name="name"
                                                value={values.name}
                                                placeholder="Название статьи"
                                                className="project-page__form_input"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name && (
                                                <DefaultTooltip
                                                    message={errors.name}
                                                />
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid alignItems="center" container>
                                    <Grid item sm ={2} xs={12}>
                                        <label>Секция</label>
                                    </Grid>
                                    <Grid item sm={10} xs={12}>
                                        <div className="input-wrapper">
                                            <Select
                                                onChange={ (item) => setFieldValue("widget", item)}
                                                onBlur={ () => {
                                                    setFieldTouched("widget", true);
                                                }}
                                                onFocus={() => {
                                                    setFieldTouched("widget", false);
                                                }}
                                                value={values.widget}
                                                styles={customStylesWhite}
                                                options={account_item_widget}
                                                theme={selectTheme}
                                                placeholder={"Секция"}
                                                maxMenuHeight={180}
                                                isClearable={true}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid alignItems="center" container>
                                    <Grid item sm ={2} xs={12}>
                                        <label>Цвет</label>
                                    </Grid>
                                    <Grid item sm={10} xs={12}>
                                        <Grid alignItems="center" container>
                                        {
                                            colors.map((color, index) => {
                                                return (
                                                    <Grid key={index} item md={1} sm={2} xs={3}>
                                                        <div
                                                            className={classes.colorContainer}
                                                            style={{ backgroundColor: `hsl(${color})` }}
                                                            onClick={(e) => {this.handleSelectColor(index)}}
                                                        >
                                                            <div className={classes.colorItem}>
                                                                { this.state.selectedColorIndex === index &&
                                                                    <Check></Check>
                                                                }
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DefaultModalBody>
                            <DefaultModalControls>
                                <div className="controls-wrapper">
                                    <span>
                                        {this.props.isEdit ?
                                            (<button type="submit" className="action_btn primary" >Сохранить</button>) :
                                            (<button type="submit" className="action_btn primary">Создать</button>)
                                        }
                                        <button type="button" className="action_btn" onClick={this.props.closeForm}>Закрыть</button>
                                    </span>
                                    {!this.props.isEdit ||
                                    <span>
                                        <button type="button" className="delete_btn" onClick={this.props.confirmDelete}>Удалить</button>
                                    </span>
                                    }
                                </div>
                            </DefaultModalControls>
                        </form>
                    );
                }}
            </Formik>
        )
    }
}

export default compose(
    withStyles(styles, {
        name: 'AccountForm',
    }),
    connect()
)(AccountForm);
