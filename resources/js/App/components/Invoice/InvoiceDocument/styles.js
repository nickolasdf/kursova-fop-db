import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
        fontSize: 22,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
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
        fontFamily: 'Roboto',
        fontWeight: 'regular'
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
        marginBottom: 5,
        fontWeight: 'bold'
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
        marginTop: 10,
        fontWeight: 'bold'
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
    flexFill: {
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
    },
    signUnderlineText: {
        fontSize: 7,
        color: 'grey',
        marginTop: 5,
        fontWeight: 'thin'
    },
    signContainerAlign: {
        alignItems: 'center'
    }
});
