import React from 'react';

import './styles.scss';
import { Grid } from '@material-ui/core';
import Button from '../../custom/Button';

const AccountModal = () => {
    return (
        <>
            <form className="invoice-account-modal">
                <div className="invoice-account-modal__header">
                    <h4>Счет</h4>
                </div>

                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label>Название банка</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-top regular-input"
                            placeholder="DEUTSCHE BANK AG"
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginBottom: '1rem' }}>
                    <Grid item xs={4}>
                        <label>Номер банка</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-bottom regular-input"
                            placeholder="1006000"
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label className="label-bold">Банк получатель</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-top regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label>Адресс</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label>Адресс 2</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginBottom: '1rem' }}>
                    <Grid item xs={4}>
                        <label>Swift-код</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-bottom regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label className="label-bold">Банк посредник</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-top regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label>Адресс</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label>Адресс 2</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginBottom: '1rem' }}>
                    <Grid item xs={4}>
                        <label>Swift-код</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-bottom regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label className="label-bold">Номер счета</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-top regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <label>BIC</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" style={{ marginBottom: '3rem' }}>
                    <Grid item xs={4}>
                        <label>Номер счета</label>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-bottom regular-input"
                            placeholder=""
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </form>

            <div className="buttons-container">
                <Button variant="regular" onClick={null}>Сохранить</Button>
                <Button variant="passive" onClick={null}>Отменить</Button>
            </div>
        </>
    );
};

export default AccountModal;
