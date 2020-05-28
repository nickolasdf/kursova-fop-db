import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import './style.scss';
import Button from '../../components/custom/Button';

const useStyles = makeStyles({
    datePickerInput: {
        border: '1px solid #EFEFEF',
        borderRadius: '1px',
        backgroundColor: '#FAFAFA',
        height: '2.5rem',
        padding: '0 12px',
        boxSizing: 'border-box'
    }
});

/**
 * Modal for creating executive user
 * @param {object} props - component props;
 * @param {function} props.onClose - Modal close handler.
 */
const ExecutorAddModal = ({ onClose }) => {

    const classes = useStyles();

    return (
        <>
            <div className="executor__header">
                <h4>Добавить исполнителя</h4>
                <span
                    className="executor__header-button"
                    onClick={onClose}
                >
                    <HighlightOffOutlinedIcon style={{ fontSize: 18 }}/>
                </span>
            </div>
            <hr/>
            <form className="executor__form">
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <DatePicker
                            onChange={date => console.log('Date:', date)}
                            name="date"
                            disableToolbar
                            variant="inline"
                            format="DD.MM.YYYY"
                            id="date-picker-inline-start_work"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.datePickerInput
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            placeholder="Место"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <input
                        placeholder="ФОП"
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        placeholder="Адрес"
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        placeholder="ИПН"
                    />
                </Grid>
            </form>
            <div className="executor__buttons-container">
                <Button onClick={null}>Добавить</Button>
            </div>
        </>
    );
};

export default ExecutorAddModal;
