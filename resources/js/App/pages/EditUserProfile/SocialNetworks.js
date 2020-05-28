import React, { memo } from 'react';
import { useFormik } from 'formik';

import './style.scss';
import Button from '../../components/custom/Button';

/**
 * Social networks component
 */
const SocialNetworks = ({
    social_network, handleDeleteSocialNetwork,
    handleAddSocialNetwork
}) => {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            social_network: social_network,
            newSocialNetwork: ''
        },
        onSubmit: values => {
            if (values.newSocialNetwork.length > 0) {
                const social_networks = [
                    ...values.social_network,
                    values.newSocialNetwork
                ];
                handleAddSocialNetwork(social_networks);
            }
        }
    });

    return (
        <>
            {/*<div className="profile-edit-page__editional-info-wrapper">*/}
            {/*    {props.social_network.map((link, key) => {*/}
            {/*        return (*/}
            {/*            <div*/}
            {/*                key={key}*/}
            {/*                className="profile-edit-page__editional-info-item"*/}
            {/*            >*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    className="profile-edit-page__editional-info-input readonly"*/}
            {/*                    placeholder={"Ссылка"}*/}
            {/*                    value={link}*/}
            {/*                    readOnly*/}
            {/*                />*/}
            {/*                <div*/}
            {/*                    className="profile-edit-page__editional-info-item-delete"*/}
            {/*                    onClick={() => handleDeleteSocialNetwork(key)}*/}
            {/*                ></div>*/}
            {/*            </div>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</div>*/}

            <form className="profile__form-container" onSubmit={formik.handleSubmit}>
                <div className="profile__input-wrapper">
                    <input
                        name="newSocialNetwork"
                        value={formik.values.newSocialNetwork}
                        type="text"
                        className="profile__regular-input"
                        placeholder={'Ссылка'}
                        onChange={formik.handleChange}
                    />
                </div>
            </form>
            <div className="profile__submit-button">
                <Button onClick={formik.handleSubmit} variant="regular">Добавить</Button>
            </div>
        </>
    );
};

export default memo(SocialNetworks);
