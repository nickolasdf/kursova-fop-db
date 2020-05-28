import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { useFormik } from 'formik';
import { connect } from 'react-redux';

import requests from '../../requests';
import { throwAlert } from '../../reducers/App/actions';
import { SUCCESS } from '../../config/alertVariants';
import Button from '../../components/custom/Button';
import './style.scss';

const Skills = props => {
    const {
        skills,
        userId,
        customStylesWithoutOutlines,
        skillLevelEnum,
        selectTheme,
        customStylesWithoutOutlinesGrey,
        skillEnum,
        setSkills,
        throwAlert
    } = props;

    const handleAddNewSkill = (newSkill, newSkillLevel) => {
        const isSkillExist = skills.some(
            skill => skill.skill_id === newSkill.value
        );
        if (!isSkillExist) {
            requests.User.addSkill(userId, {
                skill_id: newSkill.value,
                skill_level_id: newSkillLevel.value
            }).then(data => {
                if (data.data.result === true) {
                    setSkills([...skills, data.data.data]);
                    throwAlert(SUCCESS, 'Навык добавлен');
                }
            });
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            skills: skills,
            newSkill: '',
            newSkillLevel: ''
        },
        onSubmit: values =>
            handleAddNewSkill(values.newSkill, values.newSkillLevel)
    });

    const handleSkillLevelChange = (selectedSkill, skillLevel) => {
        const foundSkill = skills.find(skill => skill.id === selectedSkill.id);
        const updatedSkills = skills.map(skill => {
            if (skill.id === foundSkill.id) {
                return {
                    ...foundSkill,
                    level: skillLevel.label,
                    skill_level_id: skillLevel.value
                };
            } else {
                return skill;
            }
        });
        requests.User.updateSkill(foundSkill.id, {
            skill_id: foundSkill.skill_id,
            skill_level_id: skillLevel.value
        }).then(data => {
            if (data.data.result === true) {
                setSkills(updatedSkills);
                throwAlert(SUCCESS, 'Навык обновлен');
            }
        });
    };

    const handleDeleteSkill = skill => {
        const skillsAfterDeleting = skills.filter(sk => sk.id !== skill.id);
        requests.User.deleteSkill(skill.id).then(data => {
            if (data.data.result === true) {
                setSkills(skillsAfterDeleting);
                throwAlert(SUCCESS, 'Навык удален');
            }
        });
    };

    return (
        <>
            {/*<div className="profile-edit-page__editional-info-wrapper">*/}
            {/*    {formik.values.skills.map((skill, key) => {*/}
            {/*        return (*/}
            {/*            <div*/}
            {/*                key={key}*/}
            {/*                className="profile-edit-page__editional-info-item"*/}
            {/*            >*/}
            {/*                <Grid key={key} container spacing={0}>*/}
            {/*                    <>*/}
            {/*                        <Grid item xs={12}>*/}
            {/*                            <input*/}
            {/*                                type="text"*/}
            {/*                                className="profile-edit-page__editional-info-input"*/}
            {/*                                placeholder={'Навык'}*/}
            {/*                                value={skill.value}*/}
            {/*                                readOnly*/}
            {/*                            />*/}
            {/*                        </Grid>*/}
            {/*                        <Grid item xs={12}>*/}
            {/*                            <Select*/}
            {/*                                onChange={level =>*/}
            {/*                                    handleSkillLevelChange(*/}
            {/*                                        skill,*/}
            {/*                                        level*/}
            {/*                                    )*/}
            {/*                                }*/}
            {/*                                value={{*/}
            {/*                                    label: skill.level,*/}
            {/*                                    value: skill.skill_level_id*/}
            {/*                                }}*/}
            {/*                                styles={customStylesWithoutOutlines}*/}
            {/*                                options={skillLevelEnum.map(*/}
            {/*                                    level => ({*/}
            {/*                                        label: level.value,*/}
            {/*                                        value: level.id*/}
            {/*                                    })*/}
            {/*                                )}*/}
            {/*                                theme={selectTheme}*/}
            {/*                                placeholder="Уровень"*/}
            {/*                            />*/}
            {/*                        </Grid>*/}
            {/*                        <div*/}
            {/*                            className="profile-edit-page__editional-info-item-delete"*/}
            {/*                            onClick={() => handleDeleteSkill(skill)}*/}
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
                        <p>Навык</p>
                        <Select
                            onChange={newSkill =>
                                formik.setFieldValue(
                                    'newSkill',
                                    newSkill
                                )
                            }
                            value={formik.values.newSkill}
                            styles={customStylesWithoutOutlinesGrey}
                            options={skillEnum.map(skill => ({
                                label: skill.value,
                                value: skill.id
                            }))}
                            theme={selectTheme}
                            placeholder=" "
                        />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="profile__inputs-container">
                        <p>Уровень</p>
                        <Select
                            onChange={level =>
                                formik.setFieldValue(
                                    'newSkillLevel',
                                    level
                                )
                            }
                            value={formik.values.newSkillLevel}
                            styles={customStylesWithoutOutlinesGrey}
                            options={skillLevelEnum.map(level => ({
                                label: level.value,
                                value: level.id
                            }))}
                            theme={selectTheme}
                            placeholder="0"
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

export default connect(null, mapDispatchToProps)(memo(Skills));
