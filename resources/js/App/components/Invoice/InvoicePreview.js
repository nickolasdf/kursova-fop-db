import React from 'react';
import { Grid } from '@material-ui/core';
import { PDFViewer } from '@react-pdf/renderer';

import InvoiceDocument from './InvoiceDocument';
import './style.scss';

/**
 * Component for previewing invoice document
 */
const InvoicePreview = () => {
    return (
        <Grid item lg={12} xs={12}>
            <div className="preview-document-wrapper">
                <PDFViewer>
                    <InvoiceDocument/>
                </PDFViewer>
            </div>
        </Grid>
    );
};

export default InvoicePreview;
