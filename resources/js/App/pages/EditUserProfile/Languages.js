import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
// import DefaultTooltip from "../../components/DefaultTooltip";
import Select from 'react-select';
import { useFormik } from 'formik';
import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import { connect } from 'react-redux';
import Button from '../../components/custom/Button';

const Languages = props => {
    const {
        languages,
        userId,
        setLanguages,
        customStylesWithoutOutlines,
        languages_level,
        selectTheme,
        languageEnums,
        customStylesWithoutOutlinesGrey,
        throwAlert
    } = props;

    const handleAddNewLanguage = (newLanguage, newLanguageLevel) => {
        const isLanguageExist = languages.some(
            lang => lang.language_id === newLanguage.value
        );
        if (!isLanguageExist) {
            requests.User.addLanguage(userId, {
                language_id: newLanguage.value,
                language_level_id: newLanguageLevel.value
            }).then(data => {
                if (data.data.result === true) {
                    setLanguages([...languages, data.data.data]);
                    throwAlert(SUCCESS, 'Язык добавлен');
                }
            });
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            languages: languages,
            newLanguage: '',
            newLanguageLevel: ''
        },
        onSubmit: values => {
            handleAddNewLanguage(values.newLanguage, values.newLanguageLevel);
        }
    });

    const handleLanguageLevelChange = (lang, level) => {
        const foundLanguage = languages.find(l => l.id === lang.id);
        const updatedArray = languages.map(item => {
            if (item.id === foundLanguage.id) {
                return {
                    ...foundLanguage,
                    level: level.label,
                    language_level_id: level.value
                };
            } else {
                return item;
            }
        });
        requests.User.updateLanguage(lang.id, {
            language_id: lang.language_id,
            language_level_id: level.value
        }).then(data => {
            if (data.data.result === true) {
                setLanguages(updatedArray);
                throwAlert(SUCCESS, 'Уровень владения языком обновлен ;)');
            }
        });
    };

    const handleDeleteLanguage = id => {
        const arrayAfterDeleting = languages.filter(
            (lang, index) => lang.id !== id
        );
        requests.User.deleteLanguage(id).then(res => {
            if (res.data.result === true) {
                setLanguages(arrayAfterDeleting);
                throwAlert(SUCCESS, 'Язык удален');
            }
        });
    };

    return (
        <>
            {/*<div className="profile-edit-page__editional-info-wrapper">*/}
            {/*    {formik.values.languages.map((language, key) => {*/}
            {/*        return (*/}
            {/*            <div*/}
            {/*                key={key}*/}
            {/*                className="profile-edit-page__editional-info-item"*/}
            {/*            >*/}
            {/*                <Grid key={key} container spacing={0}>*/}
            {/*                    <>*/}
            {/*                        <Grid item xs={5}>*/}
            {/*                            <input*/}
            {/*                                type="text"*/}
            {/*                                className="profile-edit-page__editional-info-input"*/}
            {/*                                placeholder={'Язык'}*/}
            {/*                                value={language.value}*/}
            {/*                                readOnly*/}
            {/*                            />*/}
            {/*                        </Grid>*/}
            {/*                        <Grid item xs={5}>*/}
            {/*                            <Select*/}
            {/*                                onChange={level =>*/}
            {/*                                    handleLanguageLevelChange(*/}
            {/*                                        language,*/}
            {/*                                        level*/}
            {/*                                    )*/}
            {/*                                }*/}
            {/*                                value={{*/}
            {/*                                    label: language.level,*/}
            {/*                                    value: language.id*/}
            {/*                                }}*/}
            {/*                                styles={customStylesWithoutOutlines}*/}
            {/*                                options={languages_level.map(*/}
            {/*                                    level => ({*/}
            {/*                                        label: level.value,*/}
            {/*                                        value: level.id*/}
            {/*                                    })*/}
            {/*                                )}*/}
            {/*                                theme={selectTheme}*/}
            {/*                                placeholder={'Уровень'}*/}
            {/*                            />*/}
            {/*                        </Grid>*/}
            {/*                        <div*/}
            {/*                            className="profile-edit-page__editional-info-item-delete"*/}
            {/*                            onClick={() =>*/}
            {/*                                handleDeleteLanguage(language.id)*/}
            {/*                            }*/}
            {/*                        ></div>*/}
            {/*                    </>*/}
            {/*                </Grid>*/}
            {/*            </div>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</div>*/}
            <form className="profile__form-container" onSubmit={formik.handleSubmit}>
                <Grid item xs={6}>
                    <div className="profile__select-container">
                        <p>Язык</p>
                        <Select
                            onChange={lang =>
                                formik.setFieldValue(
                                    'newLanguage',
                                    lang
                                )
                            }
                            name="newLanguage"
                            value={formik.values.newLanguage}
                            styles={customStylesWithoutOutlinesGrey}
                            options={languageEnums.map(level => ({
                                label: level.value,
                                value: level.id
                            }))}
                            theme={selectTheme}
                            placeholder=" "
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="profile__select-container">
                        <p>Уровень</p>
                        <Select
                            onChange={level =>
                                formik.setFieldValue(
                                    'newLanguageLevel',
                                    level
                                )
                            }
                            value={formik.values.newLanguageLevel}
                            styles={customStylesWithoutOutlinesGrey}
                            options={languages_level.map(level => ({
                                label: level.value,
                                value: level.id
                            }))}
                            theme={selectTheme}
                            placeholder="не выбран"
                        />
                    </div>
                </Grid>
            </form>
            <div className="profile__submit-button">
                <Button onClick={formik.handleSubmit} variant="regular">Добавить</Button>
            </div>

            <div className="divider"/>
        </>
    );
};

const mapDispatchToProps = {
    throwAlert
};

export default connect(null, mapDispatchToProps)(memo(Languages));
