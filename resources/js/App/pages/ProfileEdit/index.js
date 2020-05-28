import React from "react";
import MainLayout from "../../components/MainLayout";
import Grid from '@material-ui/core/Grid';
import Preloader from "../../components/Preloader";
import SelectField from "../../components/ProfileEdit/SelectField";
import UploadImageDialog from "../../components/ProfileEdit/UploadImageDialog";
import DialogWrapper from "../../components/ProfileEdit/DialogWrapper";
import DefaultTooltip from "../../components/DefaultTooltip";
import "./style.scss";
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import {
    fetchUserInfo, editProfileUserInfo, UpdateSocialNetwork,
    addUserLanguage, editUserLanguage, deleteUserLanguage,
    addUserSkill, editUserSkill, deleteUserSkill
} from "../../reducers/Profile/actions";
import connect from "react-redux/es/connect/connect";
import {SelectData} from "../../config/statuses";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";

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

const selectThemeWhite = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#ffd63c',
        primary: '#ffd63c',
    },
});

const optionsSex = [
    { value: 'Женская', label: 'Женская' },
    { value: 'Мужская', label: 'Мужская' }
];

const optionsLang = [
    { value: 'Українська', label: 'Українська' },
    { value: 'Русский', label: 'Русский' },
    { value: 'English', label: 'English' }
];

const optionsLangLevel = [
    { value: 'Вільно', label: 'Вільно' },
    { value: 'З словником', label: 'З словником' },
    { value: 'Перекладаю', label: 'Перекладаю' }
];

class ProfileEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSocialNetwork: "",
            languages_level: [],
            languages: [],
            skills_level: [],
            skills: [],
            sex_status: [],
            add_language_level: {},
            add_language: {},
            add_skill_level: {},
            add_skill: {},
            isOpenUploadImageDialog: false,
        };

        this.inputFirstName = React.createRef();
        this.inputLastName = React.createRef();
        this.inputPassword = React.createRef();
        this.inputPhone = React.createRef();

        this.handleSocialNetworkChange = this.handleSocialNetworkChange.bind(this);
        this.handleNewSocialNetworkChange = this.handleNewSocialNetworkChange.bind(this);
        this.handleAddNewSocialNetwork = this.handleAddNewSocialNetwork.bind(this);
        this.handleDeleteSocialNetwork = this.handleDeleteSocialNetwork.bind(this);

        this.handleSelectLanguageLevelChange = this.handleSelectLanguageLevelChange.bind(this);
        this.handleAddSelectLanguageLevelChange = this.handleAddSelectLanguageLevelChange.bind(this);
        this.handleAddSelectLanguageChange = this.handleAddSelectLanguageChange.bind(this);
        this.handleAddNewLanguage = this.handleAddNewLanguage.bind(this);
        this.handleDeleteLanguage = this.handleDeleteLanguage.bind(this);

        this.handleSelectSkillLevelChange = this.handleSelectSkillLevelChange.bind(this);
        this.handleAddSelectSkillLevelChange = this.handleAddSelectSkillLevelChange.bind(this);
        this.handleAddSelectSkillChange = this.handleAddSelectSkillChange.bind(this);
        this.handleAddNewSkill = this.handleAddNewSkill.bind(this);
        this.handleDeleteSkill = this.handleDeleteSkill.bind(this);

        this.saveProfileInfo = this.saveProfileInfo.bind(this);

        this.handleBirthdayDateChange = this.handleBirthdayDateChange.bind(this);
        this.handleSexStatusChange = this.handleSexStatusChange.bind(this);


        this.handleUploadImageDialogOpen = this.handleUploadImageDialogOpen.bind(this);
        this.handleUploadImageDialogClose = this.handleUploadImageDialogClose.bind(this);
    }

    saveProfileInfo(values) {

        const firstName = values.first_name;
        const lastName = values.last_name;
        const password = values.password;
        const phone = values.phone;
        const sex = values.sex.label;
        const start_work = values.dateStart;
        const birthday = values.birthday;


        this.props.dispatch(  editProfileUserInfo( {
            firstName: firstName,
            lastName: lastName,
            password: password,
            phone: phone,
            sex: sex,
            start_work: start_work,
            birthday: birthday,
        }) );
    }

    handleSexStatusChange (item) {

        this.setState(prevState => {
            let userInfo = Object.assign({}, prevState.userInfo);
            userInfo.user.sex = item.label;
            return { userInfo };
        });
    }

    handleBirthdayDateChange (date) {

        this.setState(prevState => {
            let userInfo = Object.assign({}, prevState.userInfo);
            userInfo.user.birthday = moment(date);
            return { userInfo };
        });
    }

    handleStartDateChange (date) {

        this.setState(prevState => {
            let userInfo = Object.assign({}, prevState.userInfo);
            userInfo.user.dateStart = moment(date);
            return { userInfo };
        });
    }

    handleSocialNetworkChange(event, key) {

        const { userInfo: { user: { social_network = [],  } = {} } = {} } = this.props;
        social_network[key] = event.target.value;

        this.props.dispatch(  UpdateSocialNetwork( {
            social_network: social_network
        }) );
    }

    handleNewSocialNetworkChange(event) {

        this.setState({
            newSocialNetwork: event.target.value
        });
    }

    handleAddNewSocialNetwork(values) {

        const { userInfo: { user: { social_network = [],  } = {} } = {} } = this.props;
        const newNetwork = values.newSocialNetwork;
        social_network.push(newNetwork);

        this.props.dispatch(  UpdateSocialNetwork( {
            social_network: social_network
        }) );
    }

    handleDeleteSocialNetwork(key) {

        const { userInfo: { user: { social_network = [],  } = {} } = {} } = this.props;
        social_network.splice(key, 1);

        this.props.dispatch(  UpdateSocialNetwork( {
            social_network: social_network
        }) );
    }

    

    //languages

    handleSelectLanguageLevelChange (item, key){

        this.props.dispatch(  editUserLanguage( {
            id: this.props.userInfo.languages[key].id,
            language_id: this.props.userInfo.languages[key].language_id,
            language_level_id: item.value,
            key: key,
            item: item,
        }) );
    }

    handleAddSelectLanguageLevelChange (item){

        this.setState({
            add_language_level: item
        });
    }

    handleAddSelectLanguageChange (item){

        this.setState({
            add_language: item
        });
    }

    handleAddNewLanguage (values) {

        this.props.dispatch( addUserLanguage({
            language_id: values.language.value,
            language_level_id: values.level.value,
        }) );
    }

    handleDeleteLanguage(key) {

        this.props.dispatch(  deleteUserLanguage( {
            id: this.props.userInfo.languages[key].id,
            key: key
        }) );
    }

    //skills

    handleSelectSkillLevelChange (item, key){

        this.props.dispatch(  editUserSkill( {
            id: this.props.userInfo.skills[key].id,
            skill_id: this.props.userInfo.skills[key].skill_id,
            skill_level_id: item.value,
            key: key,
            item: item,
        }) );
    }

    handleAddSelectSkillLevelChange (item){

        this.setState({
            add_skill_level: item
        });
    }

    handleAddSelectSkillChange (item){

        this.setState({
            add_skill: item
        });
    }

    handleAddNewSkill (values) {

        this.props.dispatch( addUserSkill({
            skill_id: values.skill.value,
            skill_level_id: values.level.value,
        }) );
    }

    handleDeleteSkill(key) {

        this.props.dispatch(  deleteUserSkill( {
            id: this.props.userInfo.skills[key].id,
            key: key
        }) );
    }

    componentWillReceiveProps(nextProps) {
        if ( ! Object.is( this.state, {...this.state,...nextProps}) ) {
            this.setState({...nextProps});
        }

    }

    componentDidMount() {
        this.props.dispatch( fetchUserInfo() );
        
        let selects = new SelectData();

        selects.getEnums().then( () => {
            this.setState({
                languages_level: selects.language_level,
                languages: selects.language,
                skills_level: selects.skill_level,
                skills: selects.skill,
                sex_status: selects.sex_status,
            });

            console.log(this.state.sex_status);
        });
        this.componentWillUnmount
    }

    handleUploadImageDialogOpen () {
        this.setState({ isOpenUploadImageDialog: true })
    }

    handleUploadImageDialogClose () {
        this.setState({ isOpenUploadImageDialog: false })
    }

    render() {
        const { userInfo: { user: { first_name = '',  } = {} } = {} } = this.props;
        const { userInfo: { user: { image = '',  } = {} } = {} } = this.props;
        const { userInfo: { user: { last_name = '',  } = {} } = {} } = this.props;
        const { userInfo: { user: { email = '',  } = {} } = {} } = this.props;
        const { userInfo: { user: { phone = '',  } = {} } = {} } = this.props;

        const { userInfo: { user: { social_network = [],  } = {} } = {} } = this.props;
        const { userInfo: { languages = [] } = {} } = this.props;
        const { userInfo: { skills = [] } = {} } = this.props;

        const { userInfo: { user: { sex = '',  } = {} } = {} } = this.props;
        const { userInfo: { user: { birthday = moment(),  } = {} } = {} } = this.state;
        const { userInfo: { user: { dateStart = moment(),  } = {} } = {} } = this.state;

        console.log("sex", sex);
        console.log("sex2", this.state.sex_status.filter( _sex => _sex.label == sex)[0]);

        return (
            <MainLayout>
                <DialogWrapper isOpen={this.state.isOpenUploadImageDialog} closeForm={this.handleUploadImageDialogClose} >
                    <UploadImageDialog closeForm={this.handleUploadImageDialogClose}/>
                </DialogWrapper>

                <div className="main__title-wrapper ">
                    <h1 className="main__title">Редактирование профиля</h1>
                    <div className="save-wrapper">
                        <button type="submit" form="profile_form" className="profile-edit-page__save_btn">Сохранить изменения</button>
                    </div>
                </div>

                {this.props.pending ?
                    <div className="avatar__body center">
                        <Preloader/>
                    </div>
                    :
                    (<div className='profile-edit-page__container'>
                        <Grid container spacing={3}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={
                                    {
                                        first_name: first_name,
                                        last_name: last_name,
                                        email: email,
                                        phone: phone,
                                        sex: this.state.sex_status.filter( _sex => _sex.label == sex)[0],
                                        birthday: birthday,
                                        dateStart: dateStart,
                                        password: '',
                                    }
                                }
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    this.saveProfileInfo(values)
                                }}

                                validationSchema={Yup.object().shape({
                                    first_name: Yup.string()
                                        .required("Обязательное поле имя"),
                                    last_name: Yup.string()
                                        .required("Обязательное поле фамилия"),
                                    sex: Yup.string()
                                        .required("Обязательное поле пол"),
                                    phone: Yup.string()
                                        .required("Обязательное поле номер мобильного"),
                                    // dateStart: Yup.string()
                                    //     .required("Обязательное поле дата начала роботы"),
                                    // birthday: Yup.string()
                                    //     .required("Обязательное поле дата рождения"),
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
                                        handleSubmit,
                                        setTouched,
                                        setFieldValue,
                                        setFieldTouched,
                                    } = props;
                                    return (
                                        <Grid item lg={4} md={12}>
                                            <form id="profile_form" onSubmit={handleSubmit}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <div className="profile-edit-page__avatar">
                                                            <div className="profile-edit-page__avatar-wrapper">
                                                                <img
                                                                    src={image}
                                                                    className="avatar-container__avatar" alt="photo" onClick={this.handleUploadImageDialogOpen}/>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div className="profile-edit-page__sub-title">Основная информация</div>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <label className="profile-edit-page__field-label">Имя</label>
                                                        <div className="input-wrapper">
                                                            <input
                                                                name="first_name"
                                                                value={values.first_name}
                                                                type="text"
                                                                className={"profile-edit-page__field-input"}
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
                                                        <label className="profile-edit-page__field-label">Фамилия</label>
                                                        <div className="input-wrapper">
                                                            <input
                                                                name="last_name"
                                                                value={values.last_name}
                                                                type="text"
                                                                className={"profile-edit-page__field-input"}
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
                                                        <label className="profile-edit-page__field-label">Пол</label>
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
                                                            {!errors.first_name && !errors.last_name && errors.sex && touched.sex && (
                                                                <DefaultTooltip
                                                                    message={errors.sex}
                                                                />
                                                            )}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <label className="profile-edit-page__field-label">Пароль</label>
                                                        <input
                                                            name="password"
                                                            value={values.password}
                                                            autoComplete={"new-password"}
                                                            type="password"
                                                            className={"profile-edit-page__field-input"}
                                                            placeholder={"Пароль"}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <label className="profile-edit-page__field-label">Електронная почта</label>
                                                        <input
                                                            type="text"
                                                            defaultValue={email}
                                                            className={"profile-edit-page__field-input disabled"}
                                                            readOnly={true}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <label className="profile-edit-page__field-label">Номер мобильного</label>
                                                        <div className="input-wrapper">
                                                            <input
                                                                name="phone"
                                                                value={values.phone}
                                                                type="text"
                                                                className={"profile-edit-page__field-input"}
                                                                placeholder={"Номер мобильного"}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {!errors.sex && !errors.first_name && !errors.last_name && errors.phone && touched.phone && (
                                                                <DefaultTooltip
                                                                    message={errors.phone}
                                                                />
                                                            )}
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                    <div className="profile-edit-page__label">Дата рождения</div>
                                                    <DatePicker
                                                        onChange={(date) => {this.handleBirthdayDateChange(date) } }
                                                        disableToolbar
                                                        variant="inline"
                                                        format="DD.MM.YYYY"
                                                        margin="normal"
                                                        id="date-picker-inline"
                                                        value={birthday}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            classes: {
                                                                input: "profile-edit-page__date-picker-input"
                                                            }
                                                        }}
                                                        classes={{
                                                            root: "profile-edit-page__date-picker"
                                                        }}
                                                    />
                                                </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <div className="profile-edit-page__label">Дата начала роботы в компании</div>
                                                        <DatePicker
                                                            onChange={(date) => {this.handleStartDateChange(date) } }
                                                            disableToolbar
                                                            variant="inline"
                                                            format="DD.MM.YYYY"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            value={dateStart}
                                                            InputProps={{
                                                                disableUnderline: true,
                                                                classes: {
                                                                    input: "profile-edit-page__date-picker-input"
                                                                }
                                                            }}
                                                            classes={{
                                                                root: "profile-edit-page__date-picker"
                                                            }}
                                                        />
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
                                        <div className="profile-edit-page__sub-title">Дополнительная информация</div>
                                    </Grid>
                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className="profile-edit-page__label">Социальные сети</div>

                                        <div className="profile-edit-page__editional-info-wrapper">
                                            {
                                                social_network.map((link, key) => {
                                                    return (
                                                        <div key={key} className="profile-edit-page__editional-info-item">
                                                            <input
                                                                type="text"
                                                                className="profile-edit-page__editional-info-input readonly"
                                                                placeholder={"Ссылка"}
                                                                value={link}
                                                                // onChange={() => this.handleSocialNetworkChange(event, key)}
                                                                readOnly={true}
                                                            />
                                                            <div
                                                                className="profile-edit-page__editional-info-item-delete"
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
                                                    <form className={"profile-edit-page__editional-info-input-wrapper"} onSubmit={handleSubmit}>
                                                        <div className="input-wrapper">
                                                            <input
                                                                name="newSocialNetwork"
                                                                value={values.newSocialNetwork}
                                                                type="text"
                                                                className="profile-edit-page__editional-info-add-input"
                                                                placeholder={"Ссылка"}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="profile-edit-page__editional-info-add-new-network"
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
                                        <div className="profile-edit-page__label">Язык</div>

                                        <div className="profile-edit-page__editional-info-wrapper">
                                            {
                                                languages.map((language, key) => {
                                                    return (
                                                        <div key={key} className="profile-edit-page__editional-info-item">
                                                            <Grid key={key} container spacing={0}>
                                                                <>
                                                                    <Grid item xs={5}>
                                                                        <input
                                                                            type="text"
                                                                            className="profile-edit-page__editional-info-input"
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
                                                                        className="profile-edit-page__editional-info-item-delete"
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
                                                    <form className={"profile-edit-page__editional-info-input-wrapper"} onSubmit={handleSubmit}>
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
                                                                    className="profile-edit-page__editional-info-add-new-network"
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
                                        <div className="profile-edit-page__label">Навыки</div>

                                        <div className="profile-edit-page__editional-info-wrapper">
                                            {
                                                skills.map((skill, key) => {
                                                    return (
                                                        <div key={key} className="profile-edit-page__editional-info-item">
                                                            <Grid key={key} container spacing={0}>
                                                                <>
                                                                    <Grid item xs={6}>
                                                                        <input
                                                                            type="text"
                                                                            className="profile-edit-page__editional-info-input"
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
                                                                        className="profile-edit-page__editional-info-item-delete"
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
                                                    <form className={"profile-edit-page__editional-info-input-wrapper"} onSubmit={handleSubmit}>
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
                                                                        className="profile-edit-page__editional-info-add-new-network"
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
                                        <div className="profile-edit-page__sub-title">Платежные данные</div>
                                    </Grid>

                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className={"profile-edit-page__payments-data-item"}>
                                            1
                                        </div>
                                    </Grid>
                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className={"profile-edit-page__payments-data-item"}>
                                            2
                                        </div>
                                    </Grid>
                                    <Grid item lg={4} md={6} xs={12}>
                                        <div className={"profile-edit-page__payments-data-add"}>
                                            Добавить карту
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>)
                }
            </MainLayout>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo,
    pending: state.Profile.pending,
});

export default connect(mapStateToProps)(ProfileEdit);
