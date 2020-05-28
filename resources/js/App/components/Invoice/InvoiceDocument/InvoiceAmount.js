import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

/**
 * Invoice section with amount data
 */
const InvoiceAmount = () => {
    const {
        contentContainer, contentSection, itemRow, itemNumberContainer, itemNumber, item, itemTitle, itemDescription,
        sectionHeightDivider, rowSectionContainer, flexFill, itemDescriptionAmount, descriptionTotalContainer, descriptionTotalSection
    } = styles;

    return (
        <View style={contentContainer}>
            <View style={contentSection}>
                <View style={itemRow}>
                    <View style={itemNumberContainer}>
                        <Text style={itemNumber}>1</Text>
                    </View>
                    <View style={item}>
                        <Text style={itemTitle}>Description</Text>
                        <Text style={itemDescription}>Опис</Text>
                    </View>
                </View>
                <View style={itemRow}>
                    <View style={itemNumberContainer}>
                        <Text style={itemNumber}>1</Text>
                    </View>
                    <View style={item}>
                        <Text style={itemTitle}>Software Development</Text>
                        <Text style={itemDescription}>Розробка програмного забезпечення</Text>
                    </View>
                </View>
            </View>
            <View style={sectionHeightDivider}/>
            <View style={contentSection}>
                <View style={rowSectionContainer}>
                    <View style={[item, flexFill]}>
                        <Text style={itemTitle}>Quantity</Text>
                        <Text style={itemDescription}>Кількість</Text>
                        <Text style={itemDescriptionAmount}>1</Text>
                    </View>
                    <View style={[item, flexFill]}>
                        <Text style={itemTitle}>Price, USD</Text>
                        <Text style={itemDescription}>Ціна, Долар США</Text>
                        <Text style={itemDescriptionAmount}>$ 450.00</Text>
                    </View>
                    <View style={[item, flexFill]}>
                        <Text style={itemTitle}>Amount, USD</Text>
                        <Text style={itemDescription}>Загальна вартість</Text>
                        <Text style={itemDescriptionAmount}>$ 450.00</Text>
                    </View>
                </View>
                <View style={[descriptionTotalContainer, descriptionTotalSection]}>
                    <View style={flexFill}>
                        <Text style={itemTitle}>Total</Text>
                    </View>
                    <View style={flexFill}>
                        <Text style={itemTitle}>$ 450.00</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default InvoiceAmount;
