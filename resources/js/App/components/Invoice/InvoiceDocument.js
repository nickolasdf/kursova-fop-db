import React from 'react';
import { Document, Font, Page, View } from '@react-pdf/renderer';

import InvoiceHeader from './InvoiceDocument/InvoiceHeader';
import InvoiceTopSection from './InvoiceDocument/InvoiceTopSection';
import InvoiceMiddleSection from './InvoiceDocument/InvoiceMiddleSection';
import InvoiceAmount from './InvoiceDocument/InvoiceAmount';
import InvoiceTotal from './InvoiceDocument/InvoiceTotal';
import InvoiceNote from './InvoiceDocument/InvoiceNote';
import InvoiceSign from './InvoiceDocument/InvoiceSign';
import { styles } from './InvoiceDocument/styles';

const robotoThin = 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-thin-webfont.ttf';
const robotoRegular = 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf';
const robotoMedium = 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf';
const robotoBold = 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf';

// Support for the cyrrilic font
Font.register({
    family: 'Roboto',
    fonts: [
        { src: robotoMedium },
        { src: robotoBold, fontWeight: 'bold' },
        { src: robotoThin, fontWeight: 'thin' },
        { src: robotoRegular, fontWeightBold: 'regular' }
    ]
});

/**
 * Component for creating PDF document
 */
const InvoiceDocument = () => {
    const { page, fullWidthDivider } = styles;

    return (
        <Document file="rivo_invoice.pdf">
            <Page size="A4" style={page}>
                <View>
                    <InvoiceHeader/>
                    <View style={fullWidthDivider}/>

                    <InvoiceTopSection/>
                    <View style={fullWidthDivider}/>

                    <InvoiceMiddleSection/>
                    <View style={fullWidthDivider}/>

                    <InvoiceAmount/>
                    <View style={fullWidthDivider}/>

                    <InvoiceTotal/>

                    <InvoiceNote/>
                </View>

                {/*Footer section with sign place*/}
                <InvoiceSign/>
            </Page>
        </Document>
    );
};

export default InvoiceDocument;
