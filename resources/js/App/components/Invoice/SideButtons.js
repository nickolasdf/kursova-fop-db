import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import './style.scss';
import InvoiceDocument from './InvoiceDocument';

/**
 * Invoide side container for a save/download buttons and actions
 */
const SideButtons = () => {

    // Attach handler for manual calling PDF document download
    const downloadPdfLink = () => {
        return (
            <PDFDownloadLink
                document={<InvoiceDocument/>}
                fileName="invoice-16012020-1.pdf"
            >
                {({ blob, url, loading, error }) => (loading ? 'Создание...' : 'Загрузить')}
            </PDFDownloadLink>
        );
    };

    return (
        <div className="side-buttons">
            <div className="side-button button-yellow">
                <span>Отправить</span>
            </div>

            {/* Chain download button with download PDF method */}
            {false &&
            <div className="side-button button-grey">
                <span>{downloadPdfLink()}</span>
            </div>}
        </div>
    );
};

export default SideButtons;
