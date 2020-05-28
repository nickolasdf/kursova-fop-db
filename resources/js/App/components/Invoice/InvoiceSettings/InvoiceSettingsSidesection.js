import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import './styles.scss';
import NavBlockWrapper from '../../NavBlockWrapper';
import SettingsElement from './SettingsElement';
import Button from '../../custom/Button';

const ITEMS = [
    {
        id: 1,
        title: 'Harold Richards',
        bank1: {
            label: 'Privat Bank',
            amount: '825 $'
        },
        bank2: {
            label: 'Mono-Bank',
            amount: '923 $'
        },
        bank3: {
            label: 'Privat-Bank',
            amount: '3123 $'
        }
    },
    {
        id: 2,
        title: 'Diane Russel',
        bank1: {
            label: 'Privat Bank',
            amount: '825 $'
        },
        bank2: {
            label: 'Mono-Bank',
            amount: '923 $'
        },
        bank3: {
            label: 'Privat-Bank',
            amount: '3123 $'
        }
    },
    {
        id: 3,
        title: 'Morris Cooper',
        bank1: {
            label: 'Privat Bank',
            amount: '825 $'
        },
        bank2: {
            label: 'Mono-Bank',
            amount: '923 $'
        },
        bank3: {
            label: 'Privat-Bank',
            amount: '3123 $'
        }
    }
];

/**
 * Invoice settings side section with customers information
 */
const InvoiceSettingsSidesection = () => {
    const [accountModal, accountModalHandler] = useState(false);

    // Toggle add/edit account modal
    const toggleAccountModal = () => {
        accountModalHandler(!accountModal);
    };

    return (
        <Grid container>
            {ITEMS.map(item => {
                return (
                    <Grid key={item.id} item xs={12} style={{ marginBottom: '2rem' }}>
                        <NavBlockWrapper
                            title={item.title}
                            isHide
                            initialValues={false}
                            spacing={16}
                        >
                            <SettingsElement
                                item={item}
                                accountModal={accountModal}
                                toggleAccountModal={toggleAccountModal}
                            />
                        </NavBlockWrapper>
                    </Grid>
                );
            })}

            <div className="">
                <Button variant="regular" onClick={null}>Добавить исполнителя</Button>
            </div>
        </Grid>
    );
};

export default InvoiceSettingsSidesection;
