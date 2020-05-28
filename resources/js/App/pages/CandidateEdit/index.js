import React from "react";
import MainLayout from "../../components/MainLayout";
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Spinner from "../../components/Spinner";
import UploadImageDialog from "../../components/CandidateEdit/UploadImageDialog";
import DialogWrapper from "../../components/ProfileEdit/DialogWrapper";
import Select from "react-select";

import "./style.scss";
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import {
    fetchCandidateInfo, editProfileCandidateInfo, UpdateSocialNetwork,
    addCandidateLanguage, editCandidateLanguage, deleteCandidateLanguage,
    addCandidateSkill, editCandidateSkill, deleteCandidateSkill
} from "../../reducers/CandidateEdit/actions";
import {
    deleteCandidate
} from "../../reducers/CandidateList/actions";

import connect from "react-redux/es/connect/connect";
import {SelectData} from "../../config/statuses";
import {Formik} from "formik";
import * as Yup from "yup";
import DefaultTooltip from "../../components/DefaultTooltip";

import history from '../../history';
import { throwAlert } from "../../reducers/App/actions";
import {ERROR, SUCCESS} from "../../config/alertVariants";
import axios from "axios";
import {FETCH_CANDIDATE_INFO_ERROR, FETCH_CANDIDATE_INFO_SUCCESS} from "../../reducers/Candidate/actionTypes";
import {DELETE_CANDIDATE_SUCCESS} from "../../reducers/CandidateList/actionTypes";
import DefaultConfirmModal from "../../components/DefaultConfirmModal";
import withStyles from "@material-ui/core/styles/withStyles";
import {compose} from "recompose";

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#f9f9f9"
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    })
};

const customStylesWhite = {
    control: (base, state) => ({
        ...base
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    })
};

const customStylesWithoutOutlines = {
    control: (base, state) => ({
        ...base,
        border: "none",
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    }),
    singleValue: base => ({
        ...base,
        color: "#0068ba",
    }),
    indicatorSeparator: base => ({
        ...base,
        display: "none"
    })
};

const customStylesWithoutOutlinesGrey = {
    control: (base, state) => ({
        ...base,
        border: "none",
        backgroundColor: "#f9f9f9"
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        padding: 0
    }),
    singleValue: base => ({
        ...base,
        color: "#0068ba",
    }),
    indicatorSeparator: base => ({
        ...base,
        display: "none"
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

const customTextarea = theme => ({
    customTextarea: {
        width: "100%",
        boxShadow: "0 0 0 1px #cccccc inset",
        border: "none",
        fontSize: "16px",
        padding: "9px 9px",
        outline: "none",
    }
});

class CandidateEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSocialNetwork: "",
            languages_level: [],
            languages: [],
            skills_level: [],
            skills: [],
            cities: [],
            sex_status: [],
            marital_status: [],
            education: [],
            education_profile: [],
            currency: [],
            experience: [],
            type_of_employment: [],
            add_language_level: {},
            add_language: {},
            add_skill_level: {},
            add_skill: {},

            isOpenUploadImageDialog: false,
            pending: false,
            formHasErrors: false,
            submitCount: 0,
            isConfirmDeleteModalOpen: false,
        };

        this.handleAddNewSocialNetwork = this.handleAddNewSocialNetwork.bind(this);
        this.handleDeleteSocialNetwork = this.handleDeleteSocialNetwork.bind(this);
        this.handleSelectLanguageLevelChange = this.handleSelectLanguageLevelChange.bind(this);
        this.handleAddNewLanguage = this.handleAddNewLanguage.bind(this);
        this.handleDeleteLanguage = this.handleDeleteLanguage.bind(this);
        this.handleSelectSkillLevelChange = this.handleSelectSkillLevelChange.bind(this);
        this.handleAddNewSkill = this.handleAddNewSkill.bind(this);
        this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
        this.saveCandidateInfo = this.saveCandidateInfo.bind(this);
        this.handleUploadImageDialogOpen = this.handleUploadImageDialogOpen.bind(this);
        this.handleUploadImageDialogClose = this.handleUploadImageDialogClose.bind(this);
    }

    handleDeleteCandidate = () => {
        const { id } = this.props.match.params;

        this.props.dispatch(deleteCandidate({
            id: id
        }));
    };

    handleClickShowConfirmDelete = () => {

        this.setState({
            isConfirmDeleteModalOpen: true,
        });

    };

    handleDeleteModalClose = () => {
        this.setState({
            isConfirmDeleteModalOpen: false,
        });
    };

    saveCandidateInfo(values) {

        const { id } = this.props.match.params;

        const first_name = values.first_name;
        const last_name = values.last_name;
        const middle_name = values.middle_name;
        const email = values.email;
        const phone = values.phone;
        const sex = values.sex ? values.sex.value : null;
        const marital_status = values.marital_status ? values.marital_status.value : null;
        const city = values.city ? values.city.value: null;
        const city_transfer = values.city_transfer ? values.city_transfer.value : null;
        const education = values.education ? values.education.value : null;
        const education_profile = values.education_profile ? values.education_profile.value : null;
        const birthday = values.birthday;
        const career_objective = values.career_objective;
        const desired_salary = values.desired_salary;
        const currency = values.currency ? values.currency.value : null;
        const experience = values.experience ? values.experience.value : null;
        const type_of_employment = values.type_of_employment ? values.type_of_employment.value : null;
        const current_work = values.current_work;
        const current_position = values.current_position;

        let profile_form_additional = document.querySelector("#profile_form_additional");

        const other_skills = profile_form_additional.elements["other_skills"].value;
        const description = profile_form_additional.elements["description"].value;

        this.props.dispatch(  editProfileCandidateInfo( {
            id: id,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            email: email,
            phone: phone,
            sex: sex,
            marital_status: marital_status,
            city: city,
            city_transfer: city_transfer,
            education: education,
            education_profile: education_profile,
            birthday: birthday,
            career_objective: career_objective,
            desired_salary: desired_salary,
            currency: currency,
            experience: experience,
            type_of_employment: type_of_employment,
            current_work: current_work,
            current_position: current_position,
            other_skills: other_skills,
            description: description,
        }) );
    }

    handleAddNewSocialNetwork(values) {

        const {candidateInfo: {user: {social_network = [],} = {}} = {}} = this.props;
        const newNetwork = values.newSocialNetwork;
        social_network.push(newNetwork);

        const { id } = this.props.match.params;

        this.props.dispatch(UpdateSocialNetwork({
            social_network: social_network,
            id: id
        }));
    }

    handleDeleteSocialNetwork(key) {

        const { candidateInfo: { user: { social_network = [],  } = {} } = {} } = this.props;
        social_network.splice(key, 1);

        const { id } = this.props.match.params;

        this.props.dispatch(  UpdateSocialNetwork( {
            social_network: social_network,
            id: id
        }) );
    }

    //languages

    handleSelectLanguageLevelChange (item, key){

        this.props.dispatch(  editCandidateLanguage( {
            id: this.props.candidateInfo.languages[key].id,
            language_id: this.props.candidateInfo.languages[key].language_id,
            language_level_id: item.value,
            key: key,
            item: item,
        }) );
    }

    handleAddNewLanguage (values) {

        const { id } = this.props.match.params;

        this.props.dispatch( addCandidateLanguage({
            id: id,
            language_id: values.language.value,
            language_level_id: values.level.value,
        }) );
    }

    handleDeleteLanguage(key) {

        this.props.dispatch(  deleteCandidateLanguage( {
            id: this.props.candidateInfo.languages[key].id,
            key: key
        }) );
    }

    //skills

    handleSelectSkillLevelChange (item, key){

        this.props.dispatch(  editCandidateSkill( {
            id: this.props.candidateInfo.skills[key].id,
            skill_id: this.props.candidateInfo.skills[key].skill_id,
            skill_level_id: item.value,
            key: key,
            item: item,
        }) );
    }

    handleAddNewSkill (values) {

        const { id } = this.props.match.params;

        this.props.dispatch( addCandidateSkill({
            id: id,
            skill_id: values.skill.value,
            skill_level_id: values.level.value,
        }) );
    }

    handleDeleteSkill(key) {

        this.props.dispatch(  deleteCandidateSkill( {
            id: this.props.candidateInfo.skills[key].id,
            key: key
        }) );
    }

    fetchCities = () => {
        this.setState({
            pending: true
        });
        axios
            .get(`/api/office/all`)
            .then(res => {

                let cities = res.data.map((item) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                });

                this.setState({
                    cities: cities
                });

            })
            .catch(error => {
                // console.log(error);
            })
            .finally(()=>{
                this.setState({
                    pending: false
                });
            });
    };

    componentDidMount() {

        const { id } = this.props.match.params;

        this.fetchCities();

        this.props.dispatch( fetchCandidateInfo(id ) );

        let selects = new SelectData();

        selects.getEnums().then( () => {
            this.setState({
                languages_level: selects.language_level,
                languages: selects.language,
                skills_level: selects.skill_level,
                skills: selects.skill,
                sex_status: selects.sex_status,
                marital_status: selects.marital_status,
                education_profile: selects.education_profile,
                education: selects.education,
                currency: selects.currency,
                experience: selects.experience,
                type_of_employment: selects.type_of_employment,
            });

            console.log(this.state.sex_status);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.formHasErrors && this.state.submitCount != prevState.submitCount) {
            this.props.dispatch(throwAlert(ERROR, "Ошибка валидации формы"));
        }

        const { id } = this.props.match.params;

        if (this.props.errorFetchCandidateId === id) {

            this.props.dispatch({
                type: FETCH_CANDIDATE_INFO_ERROR,
                error: null,
                payload: null
            });


            if (this.props.candidateEditError.status === 422) {
                history.push(`/404`);
            } else {
                history.push(`/candidates`);
            }
        }

        if (this.props.successDeleteCandidateId === id) {
            this.props.dispatch({
                type: DELETE_CANDIDATE_SUCCESS,
                payload: null
            });
            history.push(`/candidates`);
        }
    }

    handleUploadImageDialogOpen () {
        this.setState({ isOpenUploadImageDialog: true })
    }

    handleUploadImageDialogClose () {
        this.setState({ isOpenUploadImageDialog: false })
    }

    render() {
        const { candidateInfo: { user: { first_name = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { image = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { last_name = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { middle_name = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { email = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { phone = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { social_network = [],  } = {} } = {} } = this.props;
        const { candidateInfo: { languages = [] } = {} } = this.props;
        const { candidateInfo: { skills = [] } = {} } = this.props;
        const { candidateInfo: { user: { sex = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { marital_status = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { city = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { education = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { education_profile = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { career_objective = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { desired_salary = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { currency = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { experience = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { type_of_employment = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { current_work = '',  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { current_position = '',  } = {} } = {} } = this.props;

        const { candidateInfo: { user: { birthday = moment(),  } = {} } = {} } = this.props;

        const { candidateInfo: { user: { description = "",  } = {} } = {} } = this.props;
        const { candidateInfo: { user: { other_skills = "",  } = {} } = {} } = this.props;

        const { id } = this.props.match.params;

        const { classes } = this.props;

        return (
            <MainLayout>
                <DialogWrapper isOpen={this.state.isOpenUploadImageDialog} closeForm={this.handleUploadImageDialogClose} >
                    <UploadImageDialog id={id} closeForm={this.handleUploadImageDialogClose}/>
                </DialogWrapper>

                <DefaultConfirmModal
                    isOpen={this.state.isConfirmDeleteModalOpen}
                    confirnCallback={this.handleDeleteCandidate}
                    closeModalCallback={this.handleDeleteModalClose}
                    title="Удалить кандидата"
                    confirmBtnText="Удалить"
                    canselBtnText="Отменить"
                    confirmInfoText="Вы действительно хотите удалить кандидата?"
                />

                <div className="main__title-wrapper ">
                    <h1 className="main__title">Редактирование кандидата</h1>
                    <div className="save-wrapper">
                        <button type="button" className="candidate-edit-page__delete_btn" onClick={this.handleClickShowConfirmDelete} >Удалить</button>
                        <button type="submit" form="profile_form" className="candidate-edit-page__save_btn" >Сохранить изменения</button>
                    </div>
                </div>

                {!this.props.pending || (<Spinner/>) }

                <div className='candidate-edit-page__container'>
                    <Grid container spacing={3}>
                        <Formik
                            enableReinitialize={true}
                            initialValues={
                                {
                                    first_name: first_name,
                                    last_name: last_name,
                                    middle_name: middle_name,
                                    email: email,
                                    phone: phone,
                                    sex: this.state.sex_status.filter( _sex => _sex.label == sex)[0],
                                    marital_status: this.state.marital_status.filter( _marital_status => _marital_status.label == marital_status)[0],
                                    city: this.state.cities.filter( _city=> _city.label == city)[0],
                                    city_transfer: this.state.cities.filter( _city_transfer => _city_transfer.label == city)[0],
                                    education: this.state.education.filter( _education => _education.label == education)[0],
                                    education_profile: this.state.education_profile.filter( _education_profile => _education_profile.label == education_profile)[0],
                                    birthday: birthday,
                                    career_objective: career_objective,
                                    desired_salary: desired_salary,
                                    currency: this.state.currency.filter( _currency => _currency.label == currency)[0],
                                    experience: this.state.experience.filter( _experience => _experience.label == experience)[0],
                                    type_of_employment: this.state.type_of_employment.filter( _type_of_employment => _type_of_employment.label == type_of_employment)[0],
                                    current_work: current_work,
                                    current_position: current_position,
                                }
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                this.saveCandidateInfo(values)
                            }}

                            validationSchema={Yup.object().shape({
                                first_name: Yup.string()
                                    .required("Обязательное поле имя"),
                                last_name: Yup.string()
                                    .required("Обязательное поле фамилия"),
                                birthday: Yup.string()
                                    .required("Обязательное поле дата рождения"),
                                email: Yup.string()
                                    .email("Не валидная электронная почта")
                                    .required("Обязательное поле электронная почта"),
                                phone: Yup.string()
                                    .required("Обязательное поле номер мобильного"),
                                city: Yup.string()
                                    .required("Обязательное поле место жительства"),
                                career_objective: Yup.string()
                                    .required("Обязательное поле желаемая должность"),
                                desired_salary: Yup.string()
                                    .required("Обязательное поле желаемая зарплата"),
                                experience: Yup.string()
                                    .required("Обязательное поле опыт работы"),
                                current_work: Yup.string()
                                    .required("Обязательное поле текущее место работы"),
                                current_position: Yup.string()
                                    .required("Обязательное поле текущая должность"),

                            })}
                        >
                            {props => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    submitCount,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setTouched,
                                    setFieldValue,
                                    setFieldTouched,
                                    isValidating,
                                } = props;

                                console.log(submitCount);

                                // if (Object.keys(errors).length > 0) {
                                //     if ((this.state.submitCount !== submitCount)) {
                                //         this.setState({
                                //             formHasErrors: true,
                                //             submitCount,
                                //         });
                                //     }
                                // } else {
                                //     if (this.state.formHasErrors) {
                                //         this.setState({
                                //             formHasErrors: false,
                                //             submitCount,
                                //         });
                                //     }
                                // }

                                return (
                                    <Grid item lg={4} md={12}>
                                        <form id="profile_form" onSubmit={handleSubmit}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <div className="candidate-edit-page__avatar">
                                                        <div className="candidate-edit-page__avatar-wrapper">
                                                            <img
                                                                src={image}
                                                                className="avatar-container__avatar" alt="photo" onClick={this.handleUploadImageDialogOpen}/>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className="candidate-edit-page__sub-title">Основная информация</div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Имя</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="first_name"
                                                            value={values.first_name}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Имя"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {errors.first_name && touched.first_name && (
                                                            <DefaultTooltip
                                                                message={errors.first_name}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Фамилия</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="last_name"
                                                            value={values.last_name}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Фамилия"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {!errors.first_name && errors.last_name && touched.last_name && (
                                                            <DefaultTooltip
                                                                message={errors.last_name}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Отчество</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="middle_name"
                                                            value={values.middle_name}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Отчество"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Пол</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("sex", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("sex", true);
                                                                setTouched( {
                                                                    sex: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    sex: false,
                                                                });
                                                            }}
                                                            value={values.sex}
                                                            styles={customStylesWhite}
                                                            options={this.state.sex_status}
                                                            theme={selectTheme}
                                                            placeholder={"Пол"}

                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <div className="candidate-edit-page__label">Дата рождения</div>
                                                    <div className="input-wrapper">
                                                        <DatePicker
                                                            onChange={ (date) => setFieldValue("birthday", date)}
                                                            disableToolbar
                                                            variant="inline"
                                                            format="DD.MM.YYYY"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            value={values.birthday}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                classes: {
                                                                    input: "candidate-edit-page__date-picker-input"
                                                                }
                                                            }}
                                                            classes={{
                                                                root: "candidate-edit-page__date-picker"
                                                            }}
                                                        />
                                                        {!errors.first_name && !errors.last_name &&  errors.birthday && touched.birthday && (
                                                            <DefaultTooltip
                                                                message={errors.birthday}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Семейное положение</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("marital_status", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("sex", true);
                                                                setTouched( {
                                                                    marital_status: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    marital_status: false,
                                                                });
                                                            }}
                                                            value={values.marital_status}
                                                            styles={customStylesWhite}
                                                            options={this.state.marital_status}
                                                            theme={selectTheme}
                                                            placeholder={"Семейное положение"}

                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Электронная почта</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="email"
                                                            value={values.email}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Отчество"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {!errors.first_name && !errors.last_name &&  !errors.birthday &&  errors.email && touched.email && (
                                                            <DefaultTooltip
                                                                message={errors.email}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Номер мобильного</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="phone"
                                                            value={values.phone}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Номер мобильного"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email && errors.phone && touched.phone && (
                                                            <DefaultTooltip
                                                                message={errors.phone}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Место жительства</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("city", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("city", true);
                                                                setTouched( {
                                                                    city: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    city: false,
                                                                });
                                                            }}
                                                            value={values.city}
                                                            styles={customStylesWhite}
                                                            options={this.state.cities}
                                                            theme={selectTheme}
                                                            placeholder={"Место жительства"}

                                                        />
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email
                                                        && !errors.phone && errors.city && touched.city && (
                                                            <DefaultTooltip
                                                                message={errors.city}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Возможен переезд в</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("city_transfer", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("city_transfer", true);
                                                                setTouched( {
                                                                    city_transfer: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    city_transfer: false,
                                                                });
                                                            }}
                                                            value={values.city_transfer}
                                                            styles={customStylesWhite}
                                                            options={this.state.cities}
                                                            theme={selectTheme}
                                                            placeholder={"Возможен переезд в"}

                                                        />
                                                    </div>
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Образование</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("education", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("education", true);
                                                                setTouched( {
                                                                    education: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    education: false,
                                                                });
                                                            }}
                                                            value={values.education}
                                                            styles={customStylesWhite}
                                                            options={this.state.education}
                                                            theme={selectTheme}
                                                            placeholder={"Образование"}

                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Профиль образования</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("education_profile", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("education_profile", true);
                                                                setTouched( {
                                                                    education_profile: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    education_profile: false,
                                                                });
                                                            }}
                                                            value={values.education_profile}
                                                            styles={customStylesWhite}
                                                            options={this.state.education_profile}
                                                            theme={selectTheme}
                                                            placeholder={"Профиль образования"}
                                                        />
                                                    </div>
                                                </Grid>


                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Желаемая должность</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="career_objective"
                                                            value={values.career_objective}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Желаемая должность"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email
                                                        && !errors.phone && !errors.city && errors.career_objective && touched.career_objective && (
                                                            <DefaultTooltip
                                                                message={errors.career_objective}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Желаемая зарплата</label>
                                                    <div className="input-wrapper">
                                                        <Grid container spacing={3}>
                                                            <Grid item md={6}>
                                                                <input
                                                                    name="desired_salary"
                                                                    value={values.desired_salary}
                                                                    type="text"
                                                                    className={"candidate-edit-page__field-input"}
                                                                    placeholder={"Желаемая зарплата"}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </Grid>
                                                            <Grid item md={6}>
                                                                <Select
                                                                    onChange={ (item) => setFieldValue("currency", item)}
                                                                    onBlur={ () => {
                                                                        setFieldTouched("currency", true);
                                                                        setTouched( {
                                                                            currency: true,
                                                                        });
                                                                    }}
                                                                    onFocus={() => {
                                                                        setTouched( {
                                                                            currency: false,
                                                                        });
                                                                    }}
                                                                    value={values.currency}
                                                                    styles={customStylesWhite}
                                                                    options={this.state.currency}
                                                                    theme={selectTheme}
                                                                    placeholder={"Валюта"}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email
                                                        && !errors.phone && !errors.city && !errors.career_objective && errors.desired_salary && touched.desired_salary && (
                                                            <DefaultTooltip
                                                                message={errors.desired_salary}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Опыт работы</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("experience", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("experience", true);
                                                                setTouched( {
                                                                    experience: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    experience: false,
                                                                });
                                                            }}
                                                            value={values.experience}
                                                            styles={customStylesWhite}
                                                            options={this.state.experience}
                                                            theme={selectTheme}
                                                            placeholder={"Опыт работы"}
                                                        />
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email
                                                        && !errors.phone && !errors.city && !errors.career_objective && !errors.desired_salary
                                                        && errors.experience && touched.experience && (
                                                            <DefaultTooltip
                                                                message={errors.experience}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Вид занятости</label>
                                                    <div className="input-wrapper">
                                                        <Select

                                                            onChange={ (item) => setFieldValue("type_of_employment", item)}
                                                            onBlur={ () => {
                                                                setFieldTouched("type_of_employment", true);
                                                                setTouched( {
                                                                    type_of_employment: true,
                                                                });
                                                            }}
                                                            onFocus={() => {
                                                                setTouched( {
                                                                    type_of_employment: false,
                                                                });
                                                            }}
                                                            value={values.type_of_employment}
                                                            styles={customStylesWhite}
                                                            options={this.state.type_of_employment}
                                                            theme={selectTheme}
                                                            placeholder={"Вид занятости"}
                                                        />
                                                    </div>
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Текущее место работы</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="current_work"
                                                            value={values.current_work}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Текущее место работы"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email
                                                        && !errors.phone && !errors.city && !errors.career_objective && !errors.desired_salary
                                                        && !errors.experience && errors.current_work && touched.current_work && (
                                                            <DefaultTooltip
                                                                message={errors.current_work}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <label className="candidate-edit-page__field-label">Текущая должность</label>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="current_position"
                                                            value={values.current_position}
                                                            type="text"
                                                            className={"candidate-edit-page__field-input"}
                                                            placeholder={"Текущая должность"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {!errors.first_name && !errors.last_name && !errors.birthday && !errors.email
                                                        && !errors.phone && !errors.city && !errors.career_objective && !errors.desired_salary
                                                        && !errors.experience && !errors.current_work && errors.current_position && touched.current_position && (
                                                            <DefaultTooltip
                                                                message={errors.current_position}
                                                            />
                                                        )}
                                                    </div>
                                                </Grid>

                                            </Grid>
                                        </form>
                                        {/*<pre>{JSON.stringify(props, null, 2)}</pre>*/}
                                    </Grid>
                                );
                            }}
                        </Formik>

                        <Grid item lg={8} md={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <div className="candidate-edit-page__sub-title">Дополнительная информация</div>
                                </Grid>
                                <Grid item lg={4} md={6} xs={12}>
                                    <div className="candidate-edit-page__label">Социальные сети</div>

                                    <div className="candidate-edit-page__editional-info-wrapper">
                                        {
                                            social_network.map((link, key) => {
                                                return (
                                                    <div key={key} className="candidate-edit-page__editional-info-item">
                                                        <input
                                                            type="text"
                                                            className="candidate-edit-page__editional-info-input readonly"
                                                            placeholder={"Ссылка"}
                                                            value={link}
                                                            readOnly={true}
                                                        />
                                                        <div
                                                            className="candidate-edit-page__editional-info-item-delete"
                                                            onClick={() => this.handleDeleteSocialNetwork(key)}
                                                        ></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <Formik
                                        initialValues={
                                            { newSocialNetwork: '' }
                                        }
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            resetForm({});
                                            this.handleAddNewSocialNetwork(values)
                                        }}

                                        validationSchema={Yup.object().shape({
                                            newSocialNetwork: Yup.string()
                                                .required("Обязательное поле ссылка"),
                                        })}
                                    >
                                        {props => {
                                            const {
                                                values,
                                                touched,
                                                errors,
                                                isSubmitting,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit
                                            } = props;
                                            return (
                                                <form className={"candidate-edit-page__editional-info-input-wrapper"} onSubmit={handleSubmit}>
                                                    <div className="input-wrapper">
                                                        <input
                                                            name="newSocialNetwork"
                                                            value={values.newSocialNetwork}
                                                            type="text"
                                                            className="candidate-edit-page__editional-info-add-input"
                                                            placeholder={"Ссылка"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="candidate-edit-page__editional-info-add-new-network"
                                                        />
                                                        {errors.newSocialNetwork && touched.newSocialNetwork && (
                                                            <DefaultTooltip
                                                                message={errors.newSocialNetwork}
                                                            />
                                                        )}
                                                    </div>
                                                </form>
                                            );
                                        }}
                                    </Formik>
                                </Grid>
                                <Grid item lg={4} md={6} xs={12}>
                                    <div className="candidate-edit-page__label">Язык</div>

                                    <div className="candidate-edit-page__editional-info-wrapper">
                                        {
                                            languages.map((language, key) => {
                                                return (
                                                    <div key={key} className="candidate-edit-page__editional-info-item">
                                                        <Grid key={key} container spacing={0}>
                                                            <>
                                                                <Grid item xs={5}>
                                                                    <input
                                                                        type="text"
                                                                        className="candidate-edit-page__editional-info-input"
                                                                        placeholder={"Язык"}
                                                                        value={ language.value }
                                                                        readOnly={true}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={5}>
                                                                    <Select
                                                                        onChange={ (item) => this.handleSelectLanguageLevelChange (item, key)}
                                                                        value={this.state.languages_level.filter( lang => lang.label == language.level)[0]}
                                                                        styles={customStylesWithoutOutlines}
                                                                        options={this.state.languages_level}
                                                                        theme={selectTheme}
                                                                        placeholder={"Уровень"}
                                                                    />
                                                                </Grid>
                                                                <div
                                                                    className="candidate-edit-page__editional-info-item-delete"
                                                                    onClick={() => this.handleDeleteLanguage(key)}
                                                                ></div>
                                                            </>
                                                        </Grid>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                    <Formik
                                        initialValues={
                                            {
                                                language: '',
                                                level: ''
                                            }
                                        }
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            resetForm({});
                                            this.handleAddNewLanguage(values)
                                        }}

                                        validationSchema={Yup.object().shape({
                                            language: Yup.string()
                                                .required("Язык обязательное поле"),
                                            level: Yup.string()
                                                .required("Уровень обязательное поле"),
                                        })}
                                    >
                                        {props => {
                                            const {
                                                values,
                                                touched,
                                                errors,
                                                isSubmitting,
                                                handleSubmit,
                                                setTouched,
                                                setFieldValue,
                                                setFieldTouched
                                            } = props;

                                            return (
                                                <form className={"candidate-edit-page__editional-info-input-wrapper"} onSubmit={handleSubmit}>
                                                    <div className="input-wrapper">
                                                        <div className="select-wrapper">
                                                            <Grid container spacing={0}>
                                                                <Grid item xs={5}>
                                                                    <Select
                                                                        onChange={ (item) => setFieldValue("language", item)}
                                                                        onBlur={ () => {
                                                                            setFieldTouched("language", true);
                                                                            setTouched( {
                                                                                language: true,
                                                                                level: true,
                                                                            });
                                                                        }}
                                                                        onFocus={() => {
                                                                            setTouched( {
                                                                                language: false,
                                                                                level: false,
                                                                            });
                                                                        }}
                                                                        value={values.language}
                                                                        styles={customStylesWithoutOutlinesGrey}
                                                                        options={this.state.languages}
                                                                        theme={selectTheme}
                                                                        placeholder={"Язык"}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={5}>
                                                                    <Select
                                                                        onChange={ (item) => setFieldValue("level", item)}
                                                                        onBlur={ () => {
                                                                            setFieldTouched("level", true);
                                                                            setTouched( {
                                                                                language: true,
                                                                                level: true,
                                                                            });
                                                                        }}
                                                                        onFocus={() => {
                                                                            setTouched( {
                                                                                language: false,
                                                                                level: false,
                                                                            });
                                                                        }}
                                                                        value={values.level}
                                                                        styles={customStylesWithoutOutlinesGrey}
                                                                        options={this.state.languages_level}
                                                                        theme={selectTheme}
                                                                        placeholder={"Уровень"}
                                                                    />
                                                                </Grid>
                                                                <button
                                                                    type="submit"
                                                                    className="candidate-edit-page__editional-info-add-new-network"
                                                                    // onClick={this.handleAddNewLanguage}
                                                                />
                                                            </Grid>
                                                        </div>
                                                        {errors.language && touched.language && (
                                                            <DefaultTooltip
                                                                message={errors.language}
                                                            />
                                                        )}
                                                        {!errors.language && errors.level && touched.level &&(
                                                            <DefaultTooltip
                                                                message={errors.level}
                                                            />
                                                        )}
                                                    </div>
                                                    {/*<pre>{JSON.stringify(props, null, 2)}</pre>*/}
                                                </form>
                                            );
                                        }}
                                    </Formik>
                                </Grid>
                                <Grid item lg={4} md={6} xs={12}>
                                    <div className="candidate-edit-page__label">Навыки</div>

                                    <div className="candidate-edit-page__editional-info-wrapper">
                                        {
                                            skills.map((skill, key) => {
                                                return (
                                                    <div key={key} className="candidate-edit-page__editional-info-item">
                                                        <Grid key={key} container spacing={0}>
                                                            <>
                                                                <Grid item xs={6}>
                                                                    <input
                                                                        type="text"
                                                                        className="candidate-edit-page__editional-info-input"
                                                                        placeholder={"Навык"}
                                                                        value={ skill.value }
                                                                        readOnly={true}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Select
                                                                        onChange={ (item) => this.handleSelectSkillLevelChange (item, key)}
                                                                        value={this.state.skills_level.filter( _skill => _skill.label == skill.level)[0]}
                                                                        styles={customStylesWithoutOutlines}
                                                                        options={this.state.skills_level}
                                                                        theme={selectTheme}
                                                                        placeholder={"Уровень"}
                                                                    />
                                                                </Grid>
                                                                <div
                                                                    className="candidate-edit-page__editional-info-item-delete"
                                                                    onClick={() => this.handleDeleteSkill(key)}
                                                                ></div>
                                                            </>
                                                        </Grid>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                    <Formik
                                        initialValues={
                                            {
                                                skill: '',
                                                level: ''
                                            }
                                        }
                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                            resetForm({});
                                            this.handleAddNewSkill(values)
                                        }}

                                        validationSchema={Yup.object().shape({
                                            skill: Yup.string()
                                                .required("Навык обязательное поле"),
                                            level: Yup.string()
                                                .required("Уровень обязательное поле"),
                                        })}
                                    >
                                        {props => {
                                            const {
                                                values,
                                                touched,
                                                errors,
                                                isSubmitting,
                                                handleSubmit,
                                                setTouched,
                                                setFieldValue,
                                                setFieldTouched
                                            } = props;

                                            return (
                                                <form className={"candidate-edit-page__editional-info-input-wrapper"} onSubmit={handleSubmit}>
                                                    <div className="input-wrapper">
                                                        <div className="select-wrapper">
                                                            <Grid container spacing={0}>
                                                                <Grid item xs={6}>
                                                                    <Select
                                                                        onChange={ (item) => setFieldValue("skill", item)}
                                                                        onBlur={ () => {
                                                                            setFieldTouched("skill", true);
                                                                            setTouched( {
                                                                                skill: true,
                                                                                level: true,
                                                                            });
                                                                        }}
                                                                        onFocus={() => {
                                                                            setTouched( {
                                                                                skill: false,
                                                                                level: false,
                                                                            });
                                                                        }}
                                                                        value={values.skill}
                                                                        styles={customStylesWithoutOutlinesGrey}
                                                                        options={this.state.skills}
                                                                        theme={selectTheme}
                                                                        placeholder={"Навык"}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Select
                                                                        onChange={ (item) => setFieldValue("level", item)}
                                                                        onBlur={ () => {
                                                                            setFieldTouched("level", true);
                                                                            setTouched( {
                                                                                skill: true,
                                                                                level: true,
                                                                            });
                                                                        }}
                                                                        onFocus={() => {
                                                                            setTouched( {
                                                                                skill: false,
                                                                                level: false,
                                                                            });
                                                                        }}
                                                                        value={values.level}
                                                                        styles={customStylesWithoutOutlinesGrey}
                                                                        options={this.state.skills_level}
                                                                        theme={selectTheme}
                                                                        placeholder={"Уровень"}
                                                                    />
                                                                </Grid>
                                                                <button
                                                                    type="submit"
                                                                    className="candidate-edit-page__editional-info-add-new-network"
                                                                    // onClick={this.handleAddNewLanguage}
                                                                />
                                                            </Grid>
                                                        </div>
                                                        {errors.skill && touched.skill && (
                                                            <DefaultTooltip
                                                                message={errors.skill}
                                                            />
                                                        )}
                                                        {!errors.skill && errors.level && touched.level &&(
                                                            <DefaultTooltip
                                                                message={errors.level}
                                                            />
                                                        )}
                                                    </div>
                                                </form>
                                            );
                                        }}
                                    </Formik>
                                </Grid>
                                <Grid item xs={12}>
                                    <Formik
                                        enableReinitialize={true}

                                        initialValues={
                                            {
                                                other_skills: other_skills,
                                                description: description,
                                            }
                                        }
                                        onSubmit={(values, { setSubmitting }) => {
                                            this.handleSubmit(values)
                                        }}

                                        validationSchema={Yup.object().shape({

                                        })}
                                    >
                                        {props => {
                                            const {
                                                values,
                                                touched,
                                                errors,
                                                isSubmitting,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit
                                            } = props;
                                            return (
                                                <form id="profile_form_additional" className="project-form__container" onSubmit={handleSubmit}>
                                                    <Grid item xs={12}>
                                                        <div className="candidate-edit-page__label">Навыки текстом</div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextareaAutosize
                                                            name="other_skills"
                                                            rows={6}
                                                            rowsMax={20}
                                                            className={classes.customTextarea}
                                                            value={values.other_skills}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div className="candidate-edit-page__label">Описание</div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextareaAutosize
                                                            name="description"
                                                            rows={6}
                                                            rowsMax={20}
                                                            className={classes.customTextarea}
                                                            value={values.description}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                </form>
                                            );
                                        }}
                                    </Formik>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = state => ({
    candidateInfo: state.CandidateEdit.candidateInfo,
    pending: state.CandidateEdit.pending,
    errorFetchCandidateId: state.CandidateEdit.errorFetchCandidateId,
    successDeleteCandidateId: state.CandidateList.successDeleteCandidateId,
    candidateEditError: state.CandidateEdit.error,
});

export default compose(
    withStyles(customTextarea, {
        name: 'CandidateEdit',
    }),
    connect(mapStateToProps)
)(CandidateEdit);

