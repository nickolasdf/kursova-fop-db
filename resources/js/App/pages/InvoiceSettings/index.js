import React from 'react';
import { Grid } from '@material-ui/core';

import '../../components/Invoice/InvoiceSettings/styles.scss';
import MainLayout from '../../components/MainLayout';
import SideButtons from '../../components/Invoice/SideButtons';
import InvoiceSettingsForm from '../../components/Invoice/InvoiceSettings/InvoiceSettingsForm';
import InvoiceSettingsSidesection from '../../components/Invoice/InvoiceSettings/InvoiceSettingsSidesection';

/**
 * Page that displays different Invoice settings
 */
const InvoiceSettings = () => {

    return (
        <MainLayout>
            <div className="invoice-settings-container">
                <div className="invoice-settings__header">
                    <h2>Настройки</h2>

                    <SideButtons/>
                </div>

                <section className="invoice-settings__page-container">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <InvoiceSettingsSidesection/>
                        </Grid>

                        <Grid item xs={8}>
                            <InvoiceSettingsForm/>
                        </Grid>
                    </Grid>
                </section>
            </div>
        </MainLayout>
    );
};

export default InvoiceSettings;
