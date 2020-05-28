import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import { styles } from './styles';

/**
 * Invoice commentary
 */
const InvoiceNote = () => {
    const { contentContainer, noteContainerMargin, contentSection, noteText } = styles;

    return (
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
    );
};

export default InvoiceNote;
