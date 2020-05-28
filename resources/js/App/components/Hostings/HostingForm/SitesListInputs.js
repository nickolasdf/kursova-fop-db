import React from 'react';
import { Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import Input from '../../custom/Input';
import './SitesListInputs.scss';

const SitesListInputs = ({ sitesList = [], onChange, errors = [], touched = [] }) => {

    const addSite = event => {
        event.preventDefault();
        onChange([...sitesList, { id: null, name: '' }]);
    };

    const editSite = id => event => {
        onChange(sitesList.map((site, index) => {
            if (index === id) {
                return {
                    id: site.id ? site.id : null,
                    name: event.target.value
                };
            } else {
                return site;
            }
        }));
    };

    const removeSite = id => () => {
        onChange(sitesList.filter((site, index) => {
            return id !== index;
        }));
    };

    return (
        <div>
            {
                sitesList.map((site, index) => {
                    return (
                        <div key={index} className="form_row">
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <span>{`Сайт ${index > 0 ? index + 1 : ''}`}</span>
                                </Grid>
                                <Grid item xs={8}>
                                    <div className="hosting_form__site-input-wrapper">
                                        <Input
                                            value={site.name}
                                            onChange={editSite(index)}
                                            isError={Boolean(errors[index] && touched[index])}
                                            errorMessage={errors[index] ? errors[index].name : null}
                                            style={{ paddingRight: '40px' }}
                                        />
                                        <button
                                            className="hosting_form__remove-site-btn"
                                            onClick={removeSite(index)}
                                            type="button"
                                        >
                                            <ClearIcon/>
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    );
                })
            }
            <div className="add_site_btn_wrapper">
                <button type="button" className="add_site_btn" onClick={addSite}>
                    <span>Добавить сайт</span>
                    <ControlPointIcon className="add_site_icon"/>
                </button>
            </div>
        </div>
    );
};

export default SitesListInputs;
