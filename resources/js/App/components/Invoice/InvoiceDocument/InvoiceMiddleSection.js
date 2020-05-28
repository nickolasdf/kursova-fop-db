import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

/**
 * Invoice middle data section
 */
const InvoiceMiddleSection = () => {
    const {
        contentSection, contentContainer, paddingWrapper, sectionContentRow, sectionLabel, sectionPlainText,
        sectionWrapperPlainTextMargin
    } = styles;

    return (
        <View style={contentContainer}>
            <View style={[contentSection, paddingWrapper]}>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Customer Bank Information:</Text>
                </View>

                <View style={sectionContentRow}>
                    <Text style={[sectionPlainText, sectionWrapperPlainTextMargin]}># account
                        UA163510050000026006878911636</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>Name of the bank JSC "UKRSIBBANK"</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>Beneficiary Bank (JSC "UKRSIBBANK") UKRSIBBANK</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>ANDRIIVSKA STREET 2112</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>KYIV, UKRAINE</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={[sectionPlainText, sectionWrapperPlainTextMargin]}>SWIFT, KHABU2L</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>Intermediary Bank BNP PARIBAS U.S.A. - New York
                        Branch</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>New York, USA</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>SWIFT: BNPAUS3N</Text>
                </View>
            </View>
            <View style={contentSection}>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Банківські реквізити:</Text>
                </View>

                <View style={sectionContentRow}>
                    <Text style={[sectionPlainText, sectionWrapperPlainTextMargin]}>№ рахунку
                        UA1635100500000026006878911636</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>Назва банку АТ"УКРСИББАНК"</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>Банк бенефіціара(АТ"УКРСИББАНК") UKRSIBBANK</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>ANDRIIVSKA STREET 2112</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>KYIV, UKRAINE</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={[sectionPlainText, sectionWrapperPlainTextMargin]}>SWIFT-код,
                        KHABU2L</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>Банк-посередник BRP PARIBAS U.S.A - New York
                        Branch></Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>New York, USA</Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionPlainText}>SWIFT-код: BNPAUS3N</Text>
                </View>
            </View>
        </View>
    );
};

export default InvoiceMiddleSection;
