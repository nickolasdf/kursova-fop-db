import React from 'react';
import { Grid } from '@material-ui/core';
import './OfficesCardList.scss';
import OfficeItem from './OfficeItem';

const OfficesCardList = ({ offices, updateOffices, deleteOffice }) => {
    return (
        <>
            <Grid container spacing={4}>
                {
                    offices.map(item => {
                        return (
                            <Grid key={item.id} item xs={12}>
                                <OfficeItem office={item} updateOffices={updateOffices} deleteOffice={deleteOffice}/>
                            </Grid>
                        );
                    })
                }
            </Grid>

        </>
    );
};

export default OfficesCardList;
