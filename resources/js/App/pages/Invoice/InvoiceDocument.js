import React from 'react';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import logoFull from '../../static/logoFull.png';
import './style.scss';

// Support for the cyrrilic font
Font.register({
    family: 'Roboto',
    src:
        'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

/**
 * Component for creating PDF document
 */
const InvoiceDocument = () => {
    const {
        page, headerContainer, headerDetails, logoImage, detailsText, detailsNumber, fullWidthDivider,
        contentContainer, contentSection, sectionLabel, sectionText, sectionContentRow, sectionContentDivider,
        sectionHeightDivider, sectionPlainText, paddingWrapper, sectionWrapperPlainTextMargin, itemRow,
        itemNumber, itemDescription, item, itemTitle, itemNumberContainer, itemDescriptionAmount, rowSectionContainer,
        descriptionTotalContainer, descriptionTotalSection, descriptionItem, noteText, noteContainerMargin, signUnderline
    } = styles;

    return (
        <Document file="rivo_invoice.pdf">
            <Page size="A4" style={page}>
                {/*Main content section*/}
                <View>
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

                    <View style={fullWidthDivider}/>

                    {/* Container for the data in first upper section of the page */}
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

                    <View style={fullWidthDivider}/>

                    {/* Second section data */}
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

                    <View style={fullWidthDivider}/>

                    {/* Amount details container */}
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
                                <View style={item}>
                                    <Text style={itemTitle}>Quantity</Text>
                                    <Text style={itemDescription}>Кількість</Text>
                                    <Text style={itemDescriptionAmount}>1</Text>
                                </View>
                                <View style={item}>
                                    <Text style={itemTitle}>Price, USD</Text>
                                    <Text style={itemDescription}>Ціна, Долар США</Text>
                                    <Text style={itemDescriptionAmount}>$ 450.00</Text>
                                </View>
                                <View style={item}>
                                    <Text style={itemTitle}>Amount, USD</Text>
                                    <Text style={itemDescription}>Загальна вартість</Text>
                                    <Text style={itemDescriptionAmount}>$ 450.00</Text>
                                </View>
                            </View>
                            <View style={[descriptionTotalContainer, descriptionTotalSection]}>
                                <View style={descriptionItem}>
                                    <Text style={itemTitle}>Total</Text>
                                </View>
                                <View style={descriptionItem}>
                                    <Text style={itemTitle}>$ 450.00</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={fullWidthDivider}/>

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
                            <View style={item}>
                                <Text style={itemTitle}>four hundred and fifty dollars 00 cents</Text>

                            </View>
                        </View>
                    </View>

                    <View style={fullWidthDivider}/>

                    <View style={[contentContainer, noteContainerMargin]}>
                        <View style={contentSection}>
                            <Text style={noteText}>
                                All charges of correspondent banks are at the Supplier's expenses.
                            </Text>
                            <Text style={noteText}>
                                This invoice is an offer to enter into the agreement. PAyment according
                                here to shall be deemed as an acceptation of the offer to enter into the agreement on
                                the
                                terms and conditions set out herein. Payment accorfing hereto may be made not later than
                                24.01.2020.
                            </Text>
                            <Text style={noteText}>
                                Please note, that payment according hereto at the samet itme is the evidence of the work
                                perfomance and the sevice delivery in full scope, acceptation thereof and the
                                confirmation
                                of final mutual installments between Paries.
                            </Text>
                            <Text style={noteText}>
                                Payment according hereto shall be also the confirmation that Parties have no claims to
                                each
                                other and have no intention to submit any claims. The agreement shall not include
                                penalty
                                and fine clauses.
                            </Text>
                            <Text style={noteText}>
                                The Parties shall not be liable for non-perfomance or improper perfomance of the
                                obligations
                                under the agreement during the term of insuperable force circumstances.
                            </Text>
                            <Text style={noteText}>
                                Any disputes asising out of the agreement between the Parties shall be settled by the
                                competent court at the location of a defendant.
                            </Text>
                        </View>
                        <View style={contentSection}>
                            <Text style={noteText}>
                                All charges of correspondent banks are at the Supplier's expenses.
                            </Text>
                            <Text style={noteText}>
                                This invoice is an offer to enter into the agreement. PAyment according
                                here to shall be deemed as an acceptation of the offer to enter into the agreement on
                                the
                                terms and conditions set out herein. Payment accorfing hereto may be made not later than
                                24.01.2020.
                            </Text>
                            <Text style={noteText}>
                                Please note, that payment according hereto at the samet itme is the evidence of the work
                                perfomance and the sevice delivery in full scope, acceptation thereof and the
                                confirmation
                                of final mutual installments between Paries.
                            </Text>
                            <Text style={noteText}>
                                Payment according hereto shall be also the confirmation that Parties have no claims to
                                each
                                other and have no intention to submit any claims. The agreement shall not include
                                penalty
                                and fine clauses.
                            </Text>
                            <Text style={noteText}>
                                The Parties shall not be liable for non-perfomance or improper perfomance of the
                                obligations
                                under the agreement during the term of insuperable force circumstances.
                            </Text>
                            <Text style={noteText}>
                                Any disputes asising out of the agreement between the Parties shall be settled by the
                                competent court at the location of a defendant.
                            </Text>
                        </View>
                    </View>
                </View>

                {/*Footer section with sign place*/}
                <View style={contentContainer}>
                    <View style={[contentSection, sectionWrapperPlainTextMargin]}>
                        <Text style={sectionText}>Supplier/Виконавець</Text>
                        <Text style={sectionText}>Lischenjo Mykola/Ліщенко М.О.</Text>
                    </View>
                    <View style={[contentSection, { alignItems: 'center' }]}>
                        <View style={signUnderline}/>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 32,
        dispaly: 'flex',
        flexDirection: 'collumn',
        justifyContent: 'space-between'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    logoImage: {
        width: 125
    },
    headerDetails: {
        display: 'flex',
        flexDirection: 'collumn',
        alignItems: 'end'
    },
    detailsText: {
        marginBottom: 6,
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'Roboto'
    },
    detailsNumber: {
        fontSize: 12
    },
    fullWidthDivider: {
        height: 0.7,
        marginTop: 5,
        marginBottom: 5,
        boxSizing: 'border-box',
        backgroundColor: 'black'
    },
    contentSection: {
        display: 'flex',
        flexDirection: 'collumn',
        flex: 1
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 3
    },
    sectionLabel: {
        fontSize: 7,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    sectionText: {
        fontSize: 7,
        lineHeight: 1.5,
        fontFamily: 'Roboto'
    },
    sectionContentRow: {
        marginBottom: 5
    },
    sectionContentDivider: {
        height: 0.7,
        marginTop: 5,
        marginBottom: 5,
        boxSizing: 'border-box',
        backgroundColor: 'grey'
    },
    sectionHeightDivider: {
        width: 0.7,
        backgroundColor: 'black',
        marginLeft: 10,
        marginRight: 10,
        boxSizing: 'border-box'
    },
    sectionPlainText: {
        fontSize: 7,
        fontFamily: 'Roboto',
        lineHeight: 1
    },
    paddingWrapper: {
        paddingLeft: 20
    },
    sectionWrapperPlainTextMargin: {
        marginBottom: 5
    },
    itemRow: {
        dispaly: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    itemNumber: {
        fontSize: 7,
        fontFamily: 'Roboto'
    },
    itemDescription: {
        fontSize: 7,
        fontFamily: 'Roboto'
    },
    itemTitle: {
        fontSize: 8,
        fontFamily: 'Roboto',
        marginBottom: 5
    },
    item: {
        display: 'flex',
        flexDirection: 'collumn'
    },
    itemNumberContainer: {
        marginRight: 15
    },
    itemDescriptionAmount: {
        fontSize: 7,
        fontFamily: 'Roboto',
        marginTop: 10
    },
    rowSectionContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    descriptionTotalContainer: {
        paddingTop: 6,
        paddingBottom: 2,
        paddingLeft: 5,
        backgroundColor: 'black',
        color: 'white',
        marginTop: 10,
        width: '66.67%',
        alignSelf: 'flex-end'
    },
    descriptionTotalSection: {
        display: 'flex',
        flexDirection: 'row'
    },
    descriptionItem: {
        flex: 1
    },
    noteText: {
        fontSize: 6,
        fontFamily: 'Roboto',
        marginBottom: 5,
        paddingRight: 10
    },
    noteContainerMargin: {
        marginTop: 15
    },
    signUnderline: {
        height: 1,
        backgroundColor: 'grey',
        width: '66%'
    }
});

export default InvoiceDocument;
