import React from 'react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import './ContragentInfo.scss';
import './index.scss';
import { Grid } from '@material-ui/core';

/**
 * Contragent requisites details compnent.
 * @param {object} props - component props.
 */
const ContragentDetails = ({ data }) => {
    return (
        <div className="contragent__details-container">
            <>
                <div className="contragent__address">
                    <LocationOnOutlinedIcon className="contragent__location-icon" style={{ fontSize: 20 }}/>
                    <span>Vene International GmbH Karl-Liebknecht-Str. 32 10178 Berlin, Germany</span>
                </div>
                <div className="contragent__bank-details">
                    <div className="contragent__bank-details-header">Bank Details:</div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Название банка: </span>
                            </Grid>

                            <Grid item xs={6}>
                                <span>{data.bankTitle}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Номер банка:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankNumber}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank beneficiary:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankBeneficiary}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank beneficiary address 1:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankBeneficiaryAddress1}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank beneficiary address 2:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankBeneficiaryAddress2}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank beneficiary swift:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankBeneficiarySwift}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank intermediary:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankIntermediary}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank intermediary address 1:</span>
                            </Grid>
                            <Grid item xs={6}>
                                {data.bankIntermediaryAddress1}
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank intermediary address 2:</span>
                            </Grid>
                            <Grid item xs={6}>
                                {data.bankIntermediaryAddress2}
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Bank intermediary swift:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bankIntermediarySwift}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>Номер счета:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.accountNumber}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>BIC:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.bic}</span>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contragent__bank-details__item">
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <span>IBAN:</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span>{data.iban}</span>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </>
        </div>
    );
};

export default ContragentDetails;
