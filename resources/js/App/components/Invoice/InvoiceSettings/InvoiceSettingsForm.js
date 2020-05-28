import React from 'react';

import './styles.scss';
import { Grid } from '@material-ui/core';
import InlineButton from '../../custom/InlineButton';

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

const InvoiceSettingsForm = () => {
    return (
        <div className="invoice-settings__form-container">
            <hr/>
            <Grid item xs={12}>
                <label>Terms of payments and acceptation</label>
                <div className="invoice-settings__condition-container">
                    Postpayment of 100% upon the services delivery. The services being rendered at the location of
                    the customer
                </div>
            </Grid>

            <Grid item xs={12}>
                <label>Условия оплаты и передачи</label>
                <div className="invoice-settings__condition-container">
                    100% наложенный платёж по факту выполнения услуг. Услуги предоставляются по месту регистрации
                    Заказчика.
                </div>
            </Grid>

            <div className="invoice-settings__buttons-container">
                <InlineButton label="Добавить условие"/>
            </div>

            <hr/>

            <Grid item xs={12}>
                <label>Notes</label>
                <div className="invoice-settings__condition-container">
                    <p>
                        All charges of correspondent banks are at the Supplier’s expenses.
                    </p>
                    <p>
                        This Invoice is an offer to
                        enter into the agreement. Payment according here to shall be deemed as an acceptation of the
                        offer to enter into the agreement on the terms and conditions set out herein. Payment
                        according
                        hereto may be made not later than 24.01.2020.
                    </p>
                    <p>
                        Please note, that payment according hereto at the
                        same time is the evidence of the work performance and the service delivery in full scope,
                        acceptation thereof and the confirmation of final mutual installments between Parties.

                    </p>
                    <p>
                        Payment according hereto shall be also the confirmation that Parties have no claims to each
                        other and have no intention to submit any claims. The agreement shall not include penalty
                        and
                        fine clauses.
                    </p>
                    <p>
                        The Parties shall not be liable for non-performance or improper performance of the
                        obligations under the agreement during the term of insuperable force circumstances.
                    </p>
                    <p>
                        Any disputes arising out of the agreement between the Parties shall be settled by the
                        competent court at the location of a defendant.
                    </p>
                </div>
            </Grid>

            <Grid item xs={12}>
                <label>Заметки</label>
                <div className="invoice-settings__condition-container">
                    <p>
                        Все комиссии банков-корреспондентов платит исполнитель.
                    </p>
                    <p>
                        Этот инвойс является предложением
                        заключить договор. Оплата за этим инвойсу является принятием предложения заключить договор
                        на
                        условиях, изложенных в этом инвойсе. Оплата за этим инвойсу может быть осуществлена не
                        позднее
                        24.01.2020.
                    </p>
                    <p>
                        Оплата согласно этого инвойса одновременно является свидетельством выполнение работ
                        и предоставление услуг в полном объеме, их принятия, а также подтверждением конечных
                        расчетов
                        между Сторонами.
                    </p>
                    <p>
                        Оплата согласно этого инвойса является подтверждением того, что стороны не
                        имеют взаимных претензий. И не намерены направлять рекламации. Договор не предусматривает
                        штрафных санкций.
                    </p>
                    <p>
                        Стороны освобождаются от ответственности за неисполнение или ненадлежащее
                        исполнение зобов "язань. По договору на время действия форс-мажорных обстоятельств.
                    </p>
                    <p>
                        Все споры,
                        что возникнут между Сторонами по договору будут рассматриваться компетентным судом за
                        местонахождение ответчика.
                    </p>
                </div>
            </Grid>
        </div>
    );
};

export default InvoiceSettingsForm;
