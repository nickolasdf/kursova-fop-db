import React, { useState } from 'react';
import { Dialog, Grid } from '@material-ui/core';

import MainLayout from '../../components/MainLayout';
import SideButtons from '../../components/Invoice/SideButtons';
import InvoiceHeader from '../../components/Invoice/InvoiceHeader';
import InvoiceEdit from '../../components/Invoice/InvoiceEdit';
import InvoicePreview from '../../components/Invoice/InvoicePreview';
import ExecutorAddModal from '../../components/Invoice/ExecutorAddModal';
import '../../components/Invoice/style.scss';

const Invoice = () => {
    const [invoiceSwitch, invoiceSwitchHandler] = useState('edit');
    const [languageMode, languageModeHandler] = useState('multi');
    const [executorModal, executorModalHandler] = useState(false);

    // Opens or closes AddExecutorModal
    const toggleExecutorModal = () => executorModalHandler(!executorModal);

    return (
        <MainLayout>
            <div className="invoice">
                <section className="invoice__container">
                    {/* Invoice form header */}
                    <Grid container spacing={3}>
                        <Grid item xs={10}>
                            {/* Header part */}
                            <InvoiceHeader
                                invoiceSwitcher={invoiceSwitchHandler}
                                mode={invoiceSwitch}
                                languageSwitch={languageModeHandler}
                                languageMode={languageMode}
                            />

                            {invoiceSwitch === 'edit' ?
                                // Edit mode component
                                <InvoiceEdit
                                    openExecutorModal={toggleExecutorModal}
                                    languageMode={languageMode}
                                />
                                // Preview mode component
                                : <InvoicePreview/>
                            }
                        </Grid>

                        <Grid item xs={2}>
                            <SideButtons/>
                        </Grid>
                    </Grid>
                </section>
            </div>
            <Dialog
                open={executorModal}
                onClose={toggleExecutorModal}
                maxWidth="md"
                fullWidth={false}
            >
                <ExecutorAddModal onClose={toggleExecutorModal}/>
            </Dialog>

        </MainLayout>
    );
};

export default Invoice;
