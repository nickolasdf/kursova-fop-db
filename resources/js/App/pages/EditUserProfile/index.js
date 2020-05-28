import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';

import cardPlaceholder from '../../static/cardPlaceholder.png';
import DialogWrapper from '../../components/ProfileEdit/DialogWrapper';
import MainLayout from '../../components/MainLayout';
import Preloader from '../../components/Preloader';
import UploadImageDialog from '../../components/ProfileEdit/UploadImageDialog';
import requests from '../../requests';
import GeneralInfo from './GeneralInfo';
import SocialNetworks from './SocialNetworks';
import Languages from './Languages';
import Skills from './Skills';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import './style.scss';
import Button from '../../components/custom/Button';
import AddCreditCard from './AddCreditCard';

const customStylesWithoutOutlines = {
    control: (base, state) => ({
        ...base,
        border: 'none'
    }),
    menu: base => ({
        ...base,
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        height: 150
    }),
    menuList: base => ({
        ...base,
        padding: 0,
        height: 150,
        overflow: 'auto'
    }),
    singleValue: base => ({
        ...base,
        color: '#0068BA'
    }),
    indicatorSeparator: base => ({
        ...base,
        display: 'none'
    })
};

const customStylesWithoutOutlinesGrey = {
    control: (base, state) => ({
        ...base,
        border: 'none',
        backgroundColor: '#F9F9F9'
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
        color: '#0068BA'
    }),
    indicatorSeparator: base => ({
        ...base,
        display: 'none'
    })
};

const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#FFD63C',
        primary: '#FFD63C'
    }
});

const EditUserProfile = props => {
    const [user, setUser] = useState({
        birthday: '',
        dateStart: new Date(),
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        sex: '',
        password: ''
    });
    const [image, setImage] = useState('');
    const [social_network, setSocialNetwork] = useState('');
    const [isOpenUploadImageDialog, setIsOpenUploadImageDialog] = useState(
        false
    );
    const [pending, setPending] = useState(true);
    const [creditCardModal, creditCardModalHandler] = useState(false);
    const [languageEnums, setLanguageEnums] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages_level, setLanguages_level] = useState([]);
    const [skillEnum, setSkillEnum] = useState([]);
    const [skillLevelEnum, setSkillLevelEnum] = useState([]);

    const { userId } = props.match.params;
    useEffect(() => {
        requests.User.getOne(userId).then(res => {
            const { user, languages, skills } = res.data;
            setUser({ ...user, sex: { label: user.sex } });
            setImage(user.image);
            setSocialNetwork(user.social_network);
            setLanguages(languages);
            setSkills(skills);
            setPending(false);
        });

        requests.Enum.get({
            types: ['language_level', 'language', 'skill', 'skill_level']
        }).then(res => {
            const {
                language_level,
                language,
                skill,
                skill_level
            } = res.data.data;
            setLanguages_level(language_level);
            setLanguageEnums(language);
            setSkillEnum(skill);
            setSkillLevelEnum(skill_level);
        });
    }, [userId]);

    const handleDeleteSocialNetwork = key => {
        const socialsAfterDelete = social_network.filter(
            (link, index) => index !== key
        );
        requests.User.updateSocialNetwork(userId, {
            social_network: socialsAfterDelete
        }).then(res => {
            if (res.data.result === true) {
                setSocialNetwork(socialsAfterDelete);
                props.throwAlert(SUCCESS, 'Социальная сеть удалена');
            }
        });
    };

    const handleAddSocialNetwork = social_networks => {
        requests.User.updateSocialNetwork(userId, {
            social_network: social_networks
        }).then(res => {
            if (res.data.result === true) {
                setSocialNetwork(social_networks);
                props.throwAlert(SUCCESS, 'Социальная сеть добавлена');
            }
        });
    };

    const closeCreditCardModal = () => {
        creditCardModalHandler(false);
    };

    const openCreditCardModal = () => {
        creditCardModalHandler(true);
    };

    return (
        <MainLayout>
            <DialogWrapper
                isOpen={isOpenUploadImageDialog}
                closeForm={() => setIsOpenUploadImageDialog(false)}
            >
                <UploadImageDialog
                    setImage={setImage}
                    userId={userId}
                    closeForm={() => setIsOpenUploadImageDialog(false)}
                />
            </DialogWrapper>

            <div className="main__title-wrapper ">
                <h1 className="main__title">Редактирование профиля</h1>
                <div className="save-wrapper">
                    <Button
                        variant="regular"
                        onClick={() => props.throwAlert(SUCCESS, 'Информация обновлена')}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>

            {pending ? (
                <div className="avatar__body center">
                    <Preloader/>
                </div>
            ) : (
                <>
                    <div>
                        <Grid container spacing={2}>
                            {/* User info editing forms */}
                            <Grid item xs={4}>
                                <div className="user-info">
                                    <h5 className="user-info__header">Основная информация</h5>

                                    {/* User information fields */}
                                    <GeneralInfo
                                        user={user}
                                        image={image}
                                        openImageDialog={setIsOpenUploadImageDialog}
                                        userId={userId}
                                    />
                                </div>
                            </Grid>

                            {/* Additional information */}
                            <Grid item xs={4}>
                                <div className="user-info">
                                    <h5 className="user-info__header">Дополнительная информация</h5>
                                    <div className="user-info__subheader">Профессиональные навыки</div>

                                    {/* Add skill */}
                                    <Grid item xs={12}>
                                        <Skills
                                            skills={skills}
                                            userId={userId}
                                            setSkills={setSkills}
                                            customStylesWithoutOutlines={customStylesWithoutOutlines}
                                            skillLevelEnum={skillLevelEnum}
                                            selectTheme={selectTheme}
                                            customStylesWithoutOutlinesGrey={customStylesWithoutOutlinesGrey}
                                            skillEnum={skillEnum}
                                        />
                                    </Grid>

                                    {/* Add social networks */}
                                    <div className="user-info__subheader">Владение языками</div>
                                    <Grid item xs={12}>
                                        <Languages
                                            languages={languages}
                                            userId={userId}
                                            setLanguages={setLanguages}
                                            customStylesWithoutOutlines={customStylesWithoutOutlines}
                                            languages_level={languages_level}
                                            selectTheme={selectTheme}
                                            languageEnums={languageEnums}
                                            customStylesWithoutOutlinesGrey={customStylesWithoutOutlinesGrey}
                                        />
                                    </Grid>

                                    {/* Add languages */}
                                    <div className="user-info__subheader">Социальные сети</div>
                                    <Grid item xs={12}>
                                        <SocialNetworks
                                            social_network={social_network}
                                            handleDeleteSocialNetwork={handleDeleteSocialNetwork}
                                            handleAddSocialNetwork={handleAddSocialNetwork}
                                        />
                                    </Grid>
                                </div>
                            </Grid>

                            {/* Card info */}
                            <Grid item xs={4}>
                                <div className="user-info">
                                    <h5 className="user-info__header">Платежные данные</h5>

                                    <div>
                                        <img
                                            src={cardPlaceholder}
                                            alt="Credit card placeholder"
                                            className="user-info__card"
                                        />
                                    </div>

                                    <div
                                        className="user-info__card-button"
                                        onClick={openCreditCardModal}
                                    >
                                        Добавить карту
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </>
            )}

            <Dialog
                open={creditCardModal}
                onClose={closeCreditCardModal}
                maxWidth="md"
                fullWidth
            >
                <AddCreditCard closeModal={closeCreditCardModal}/>
            </Dialog>
        </MainLayout>
    );
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(EditUserProfile));
