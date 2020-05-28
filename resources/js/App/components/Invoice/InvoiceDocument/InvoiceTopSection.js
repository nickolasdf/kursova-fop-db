import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

/**
 * Invoice top data section
 */
const InvoiceTopSection = () => {
    const {
        contentContainer, contentSection, sectionLabel, sectionContentRow, sectionText, sectionContentDivider,
        sectionHeightDivider
    } = styles;

    return (
        <View style={contentContainer}>
            <View style={contentSection}>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Date and Place:
                        <Text style={sectionText}> 10.10.2020, Lutsk</Text>
                    </Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Supplier:
                        <Text style={sectionText}> Individual Enterpreneur Lishchenko Mykola
                            Olegovich</Text>
                    </Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Address:
                        <Text style={sectionText}> 45236, Volyn region, Kivetsi district, Dubyshche village,
                            VATUTINA STREET, house 1</Text>
                    </Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Individual Tax Number -
                        <Text style={sectionText}> 3180512057</Text>
                    </Text>
                </View>
                <View style={sectionContentDivider}/>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Customer:</Text>
                </View>
                <View style={sectionContentDivider}/>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Subject matter:
                        <Text style={sectionText}> Software Developer</Text>
                    </Text>
                </View>
                <View style={sectionContentDivider}/>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Currency:
                        <Text style={sectionText}> USD</Text>
                    </Text>
                </View>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Price (amount) of the goods/services:
                        <Text style={sectionText}> $ 450</Text>
                    </Text>
                </View>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Terms of payments and acceptations:
                        <Text style={sectionText}> Postpayment of 100% upon the services delivery. The
                            services
                            being rendered at the location of the Customer.</Text>
                    </Text>
                </View>
            </View>

            <View style={sectionHeightDivider}/>

            <View style={contentSection}>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Дата та місце:
                        <Text style={sectionText}> 10.10.2020, Луцьк</Text>
                    </Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Виконавець:
                        <Text style={sectionText}> ФОП Ліщенко Микола Олегович</Text>
                    </Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Адресса:
                        <Text style={sectionText}> 45236, Волинська обл., Ківерцівський район, село Дубище,
                            ВУЛИЦЯ ВАТУТІНА, будинок 1</Text>
                    </Text>
                </View>
                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>ІПН -
                        <Text style={sectionText}> 3180512057</Text>
                    </Text>
                </View>
                <View style={sectionContentDivider}/>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Замовник:</Text>
                </View>
                <View style={sectionContentDivider}/>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Предмет:
                        <Text style={sectionText}> Розробка програмного забезпечення</Text>
                    </Text>
                </View>
                <View style={sectionContentDivider}/>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Валюта:
                        <Text style={sectionText}> Доллар США</Text>
                    </Text>
                </View>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Ціна (загальна вартість) товарів/послуг:
                        <Text style={sectionText}> $ 450</Text>
                    </Text>
                </View>

                <View style={sectionContentRow}>
                    <Text style={sectionLabel}>Умови оплати та передачі:
                        <Text style={sectionText}> 100% післяплата за фактом виконання послуг. Послуги
                            надаються
                            за місцум реєстрації Замовника.</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default InvoiceTopSection;
