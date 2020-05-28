import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

/**
 * Invoice sign component
 */
const InvoiceSign = () => {
    const {
        contentContainer, contentSection, sectionWrapperPlainTextMargin, sectionText, signContainerAlign, signUnderline,
        signUnderlineText
    } = styles;

    return (
        <View style={contentContainer}>
            <View style={[contentSection, sectionWrapperPlainTextMargin]}>
                <Text style={sectionText}>Supplier/Виконавець</Text>
                <Text style={sectionText}>Lischenjo Mykola/Ліщенко М.О.</Text>
            </View>
            <View style={[contentSection, signContainerAlign]}>
                <View style={signUnderline}/>
                <Text style={signUnderlineText}>SIGNATURE</Text>
            </View>
        </View>
    );
};

export default InvoiceSign;
