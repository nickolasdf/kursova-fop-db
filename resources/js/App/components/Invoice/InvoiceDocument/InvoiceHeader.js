import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';

import logoFull from '../../../static/logoFull.png';
import { styles } from './styles';

/**
 * Header of the PDF document
 * @returns {*}
 * @constructor
 */
const InvoiceHeader = () => {
    const { headerContainer, headerDetails, logoImage, detailsText, detailsNumber } = styles;

    return (
        <View style={headerContainer}>
            <Image
                src={logoFull}
                style={logoImage}
            />
            <View style={headerDetails}>
                <Text style={detailsText}>Invoice / Offer</Text>
                <Text style={detailsNumber}># 16012020-1</Text>
            </View>
        </View>
    );
};

export default InvoiceHeader;
