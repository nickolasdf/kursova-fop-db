import React from 'react';
import { Grid } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Button from '../../components/custom/Button';
import './ContragentInfo.scss';

/**
 * Contragent info section.
 * @param {object} props - component props.
 * @param {object} props.data - contragent data to render.
 * @param {*} props.editCard - current edited field.
 * @param {function} props.modeHandler - handles the mode of the current card.
 */
const ContragentInfo = ({ data, editCard, modeHandler }) => {
    return (
        <div className="contragent_info_block">
            {(editCard === 'info') ?
                <>
                    {/* Edit card mode */}
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <PaymentIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Баланс</span>
                        </Grid>
                        <Grid item xs={9}>
                            <input
                                defaultValue="34 856"
                                className="info-edit-input"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <ChatBubbleOutlineIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Контакт</span>
                        </Grid>
                        <Grid item xs={9}>
                            <input
                                defaultValue="Ivan Ivanov"
                                className="info-edit-input"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <PhoneIphoneIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Телефон</span>
                        </Grid>
                        <Grid item xs={9}>
                            <input
                                defaultValue="12604109339"
                                className="info-edit-input"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <EmailOutlinedIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Почта</span>
                        </Grid>
                        <Grid item xs={9}>
                            <input
                                defaultValue="wyman.eladio@example.org"
                                className="info-edit-input"
                            />
                        </Grid>
                    </Grid>

                    <div className="info__save-button">
                        <Button variant="regular" onClick={() => modeHandler(null)}>Сохранить изменения</Button>
                    </div>
                </>
                : <>
                    {/* Normal card section */}
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <PaymentIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Баланс</span>
                        </Grid>
                        <Grid item xs={9}>
                            <span className="info__balance-positive">+ 34 856 грн</span>
                        </Grid>
                    </Grid>
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <ChatBubbleOutlineIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Контакт</span>
                        </Grid>
                        <Grid item xs={9}>
                            <span className="item_value">{data.customer.contact}</span>
                        </Grid>
                    </Grid>
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <PhoneIphoneIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Телефон</span>
                        </Grid>
                        <Grid item xs={9}>
                            <span className="item_value">{data.customer.phone}</span>
                        </Grid>
                    </Grid>
                    <Grid className="info_block_item" container>
                        <Grid item xs={3}>
                            <EmailOutlinedIcon className="info__icon" style={{ fontSize: 17 }}/>
                            <span className="info__title">Почта</span>
                        </Grid>
                        <Grid item xs={9}>
                            <span className="info__email">{data.customer.email}</span>
                        </Grid>
                    </Grid>

                    <div className="description_wrapper">
                        <InfoOutlinedIcon className="info__description-icon" style={{ fontSize: 17 }}/>
                        <span className="description">Создал Contragent Name в 03.01.2020 10:59</span>
                    </div>
                </>
            }
        </div>
    );
};

export default ContragentInfo;
