import React from 'react';
import { Grid } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import logoFull from '../../static/logoFull.png';
import { langEng, langMulti } from './lang';
import './style.scss';
import Select from '../Select';

const SELECT1 = [
    { label: 'select1', value: 1 },
    { label: 'select2', value: 2 },
    { label: 'select3', value: 3 }
];

const customStyles = {
    control: provided => ({
        ...provided,
        height: '3.125rem',
        background: '#FAFAFA',
        borderRadius: '4px',
        border: '1px dashed #DCE1E4'
    })
};

/**
 * Component for editing invoice data
 * @param {object} props - component props.
 * @param {function} props.openExecutorModal - Opens the AddExecutor modal.
 * @param {string} props.languageMode - Defines language mode for input customization.
 */
const InvoiceEdit = ({ openExecutorModal, languageMode }) => {

    // Localized inputs and placeholder values
    const locale = (languageMode === 'multi') ? langMulti : langEng;
    const { input1, input2, input3, input4, input5, totalSection, misc } = locale;

    return (
        <Grid item xs={12}>
            <div className="invoice__form-container">
                <div className="invoice__container-header">
                    <img src={logoFull} alt="Rivo logo"/>
                    <div className="invoice__sub-header-container">
                        <div className="invoice__sub-header-container__header">Invoice / Offer</div>
                        <div className="invoice__sub-header-container__details">% 16012020-1</div>
                    </div>
                </div>

                <Grid alignItems="center" container style={{ marginBottom: '1rem' }}>
                    <Grid item xs={2}>
                        <label className="invoice-form__label">{input1.label}</label>
                    </Grid>

                    <Grid item xs={10}>
                        <div className="select__wrapper">
                            <Select
                                onChange={() => console.log('sdasd')}
                                options={SELECT1}
                                name="1"
                                value="2"
                                placeholder={input1.placeholder}
                                styles={customStyles}
                            />
                        </div>
                    </Grid>
                </Grid>

                <Grid alignItems="center" container>
                    <Grid item xs={2}>
                        <label className="invoice-form__label">{input2.label}</label>
                    </Grid>

                    <Grid item xs={10}>
                        <div className="select__wrapper">
                            <Select
                                onChange={() => console.log('sdasd')}
                                options={SELECT1}
                                name="1"
                                value="2"
                                placeholder={input2.placeholder}
                                styles={customStyles}
                            />
                        </div>
                    </Grid>
                </Grid>

                <hr/>

                <Grid alignItems="center" container>
                    <Grid item xs={2}>
                        <label className="invoice-form__label">{input3.label}</label>
                    </Grid>

                    <Grid item xs={5}>
                        <div className="select__wrapper">
                            <Select
                                onChange={() => console.log('sdasd')}
                                options={SELECT1}
                                name="1"
                                value="2"
                                placeholder={input3.placeholder}
                                styles={customStyles}
                            />
                        </div>
                    </Grid>
                </Grid>

                <hr/>

                <Grid alignItems="center" container style={{ marginBottom: '1rem' }}>
                    <Grid item xs={1}>
                        <label>№</label>
                    </Grid>

                    <Grid item xs={5}>
                        <label>{input4.labelGroup.labelDescription}</label>
                    </Grid>

                    <Grid item xs={1}>
                        <label>{input4.labelGroup.labelAmount}</label>
                    </Grid>

                    <Grid item xs={2}>
                        <label>{input4.labelGroup.labelPrice}</label>
                    </Grid>

                    <Grid item xs={2}>
                        <label>{input4.labelGroup.labelTotal}</label>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" style={{ marginBottom: '1rem' }}>
                    <Grid item xs={1}>
                        <input
                            placeholder="1"
                            className="invoice-form__input"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <input
                            placeholder="Item"
                            className="invoice-form__input"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <input
                            placeholder="0"
                            className="invoice-form__input"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <input
                            placeholder="0"
                            className="invoice-form__input"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <input
                            placeholder="$ 0.00"
                            className="invoice-form__input"
                        />
                    </Grid>
                    <Grid item xs={1} justify="center">
                        <div className="invoice-form__delete-button-container">
                            <HighlightOffIcon className="delete-icon" style={{ fontSize: '22px' }}/>
                        </div>
                    </Grid>
                </Grid>

                {(languageMode === 'multi') &&
                <Grid container alignItems="center">
                    <Grid item xs={1}> </Grid>

                    <Grid item xs={5}>
                        <input
                            placeholder={input4.placeholderGroup.placeholderDescription}
                            className="invoice-form__input"
                        />
                    </Grid>
                </Grid>}

                <hr/>
                <div className="invoice-form__add-item-container">
                    <span>
                        <span>{misc.addItem}</span>
                        <AddCircleOutlineIcon style={{ fontSize: '20px' }}/>
                    </span>
                </div>

                <hr/>

                <div className="invoice-form__summary">
                    <div className="invoice-form__summary-item">
                        <div>{totalSection.totalAmount}</div>
                        <div className="summary-amount">$ 450</div>
                    </div>

                    <div className="invoice-form__summary-item">
                        <div>{totalSection.total}</div>
                        <div className="summary-amount">$ 450</div>
                    </div>

                    <div className="invoice-form__summary-item summary">
                        <div>{totalSection.totalToPay}</div>
                        <div className="summary-amount">$ 450</div>
                    </div>
                </div>

                <hr/>

                <Grid alignItems="center" container>
                    <Grid item xs={2}>
                        <label className="invoice-form__label">{input5.label}</label>
                    </Grid>

                    <Grid item xs={5}>
                        <div className="select__wrapper">
                            <Select
                                onChange={() => console.log('sdasd')}
                                options={SELECT1}
                                name="1"
                                value="2"
                                placeholder={input5.placeholder}
                                styles={customStyles}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
};

export default InvoiceEdit;
