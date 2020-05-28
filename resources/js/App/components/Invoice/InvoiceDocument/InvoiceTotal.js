import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

/**
 * Invoice total sum component
 */
const InvoiceTotal = () => {
    const { contentSection, contentContainer, itemRow, item, itemTitle, itemDescription, paddingWrapper } = styles;

    return (
        <View style={contentContainer}>
            <View style={[contentSection, paddingWrapper]}>
                <View style={itemRow}>
                    <View style={item}>
                        <Text style={itemTitle}>Total to pay</Text>
                        <Text style={itemDescription}>Усього до оплати</Text>
                    </View>
                </View>
            </View>
            <View style={contentSection}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={itemTitle}>four hundred and fifty dollars 00 cents</Text>
                    <Text style={itemTitle}>$ 450.00</Text>
                </View>
            </View>
        </View>
    );
};

export default InvoiceTotal;
