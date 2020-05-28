import React from 'react';
import { Grid } from '@material-ui/core';

import Button from '../../components/custom/Button';
import './style.scss';

/**
 * Add credit card form component
 * @param {object} props - component props.
 * @param {function} props.closeModal - modal close handler.
 */
const AddCreditCard = ({ closeModal }) => {
    return (
        <>
            <form className="credit-card-form">
                <h4 className="form-header">Банковская карта</h4>
                <Grid container alignItems="center">
                    <Grid item xs={4}>
                        <span>Название банка</span>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-radius-all"
                            placeholder="Приват банк"
                            onChange={event => console.log(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <div className="card-type-switch">
                            <div
                                className={`card-type-switch__section card-type-switch__active`}
                                onClick={() => console.log('test')}
                            >
                                Visa
                            </div>
                            <div
                                className={`card-type-switch__section`}
                                onClick={() => console.log('test2')}
                            >
                                Master Card
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <span>Номер счета</span>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-top"
                            placeholder="0000 0000 0000 0000"
                            onChange={() => console.log('test')}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <span>Срок действия</span>
                    </Grid>
                    <Grid item xs={4}>
                        <input
                            placeholder="Месяц"
                            onChange={() => console.log('test')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <input
                            placeholder="Год"
                            onChange={() => console.log('test')}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <span>Имя владельца карты</span>
                    </Grid>

                    <Grid item xs={8}>
                        <input
                            className="border-round-bottom"
                            placeholder="John Dee"
                            onChange={() => console.log('test')}
                        />
                    </Grid>
                </Grid>
            </form>

            <div className="credit-card-form__buttons-container">
                <Button onClick={() => console.log('dsf')} type="regular">Отправить</Button>
                <Button marginHorizontal onClick={closeModal} type="passive">Закрыть</Button>
            </div>
        </>
    );
};

export default AddCreditCard;
