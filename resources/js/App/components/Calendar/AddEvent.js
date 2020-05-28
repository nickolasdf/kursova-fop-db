import React, { useState } from 'react';
import { Grid, IconButton, InputAdornment, makeStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import placeholderAvatar1 from '../../static/placeholderAvatar1.png';
import placeholderAvatar2 from '../../static/placeholderAvatar2.png';
import './style.scss';

const RADIO_BUTTONS = [
    { value: 'project', label: 'Проект' },
    { value: 'meeting', label: 'Митинг' },
    { value: 'personel', label: 'Персонал' },
    { value: 'poffice', label: 'Офис' }
];

const useStyles = makeStyles({
    datePickerInput: {
        fontWeight: 'bold'
    },
    typography: {
        padding: '.5rem'
    }
});

/**
 * Add event modal component
 * @param {object} props - component props.
 * @param {function} props.closeModal - handles modal visibility.
 */
const AddEvent = ({ closeModal }) => {
    const [radioChecked, radioCheckedhandler] = useState('project');
    const [selectedTime, selectedTimeHandler] = useState(new Date());
    const [selectedTime2, selectedTimeHandler2] = useState(new Date());
    const [selectDate, selectDateHandler] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState(null);

    const popoverClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const popoverClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();

    const radioHandleChange = event => {
        radioCheckedhandler(event.target.value);
    };

    // Popover settings
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <form className="add-event-modal-container">
                <div className="event-modal">
                    <h4>Новое событие</h4>

                    <Grid container alignItems="center" style={{ marginBottom: '3rem' }}>
                        <Grid item xs={4}>
                            <span>Название</span>
                        </Grid>

                        <Grid item xs={8}>
                            <input
                                className="border-round event-modal__input"
                                placeholder="Название события"
                                onChange={event => console.log(event.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Тип</span>
                        </Grid>

                        <Grid className="flex" justify="space-evenly" item xs={8}>
                            {RADIO_BUTTONS.map(item => {
                                return (
                                    <FormControlLabel
                                        key={item.value}
                                        control={<Radio
                                            checked={radioChecked === item.value}
                                            value={item.value}
                                            name="event-radio-button"
                                            onChange={radioHandleChange}
                                        />}
                                        label={item.label}
                                        labelPlacement="end"
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>

                    {/* Divider */}
                    <Grid container alignItems="center">
                        <Grid item xs={4}/>
                        <Grid xs={8}>
                            <hr/>
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <span>Учасники</span>
                        </Grid>

                        <Grid className="flex" item xs={8}>
                            <img src={placeholderAvatar1} alt="User avatar" className="event-modal__avatar"/>
                            <img src={placeholderAvatar2} alt="User avatar" className="event-modal__avatar"/>

                            <div
                                className="event-modal__add-user"
                                onClick={popoverClick}
                            >+
                            </div>
                        </Grid>
                    </Grid>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={popoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        <Typography classnName={classes.typography}>
                            <div className="event-modal__popover">
                                <img
                                    src={placeholderAvatar1}
                                    alt="User avatar"
                                    className="event-modal__avatar event-modal__avatar-selected"
                                />
                                <img
                                    src={placeholderAvatar2}
                                    alt="User avatar"
                                    className="event-modal__avatar event-modal__avatar-selected"
                                />
                                <img src={placeholderAvatar1} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar2} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar1} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar2} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar1} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar2} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar1} alt="User avatar" className="event-modal__avatar"/>
                                <img src={placeholderAvatar2} alt="User avatar" className="event-modal__avatar"/>
                            </div>
                        </Typography>
                    </Popover>

                    {/* Divider */}
                    <Grid container alignItems="center">
                        <Grid item xs={4}/>
                        <Grid xs={8}>
                            <hr/>
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" style={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={4}>
                            <span>Время</span>
                        </Grid>

                        <Grid className="flex" item xs={8} justify="space-between">
                            <Grid item xs={3} className="event-modal__picker-wrapper">
                                <TimePicker
                                    ampm={false}
                                    variant="inline"
                                    value={selectedTime}
                                    onChange={selectedTimeHandler}
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            input: classes.datePickerInput
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <QueryBuilderIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} className="event-modal__picker-wrapper">
                                <TimePicker
                                    ampm={false}
                                    variant="inline"
                                    value={selectedTime2}
                                    onChange={selectedTimeHandler2}
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            input: classes.datePickerInput
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <QueryBuilderIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} className="event-modal__picker-wrapper">
                                <KeyboardDatePicker
                                    clearable
                                    value={selectDate}
                                    placeholder="10/10/2018"
                                    onChange={date => selectDateHandler(date)}
                                    minDate={new Date()}
                                    format="DD.MM"
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                            input: classes.datePickerInput
                                        }
                                    }}
                                    keyboardIcon={<EventNoteIcon style={{ fontSize: 18 }}/>}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={4}>
                            <span>Описание</span>
                        </Grid>

                        <Grid item xs={8}>
                        <textarea
                            placeholder="Не обязательно"
                            className="event-modal__textarea"
                            rows={5}
                        />
                        </Grid>
                    </Grid>
                </div>
            </form>

            <div className="form_actions_wrapper customer_form_actions_wrapper">
                <div>
                    <button
                        className="form_action_btn form_submit_action_btn"
                        type="submit"
                        onClick={closeModal}
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={closeModal}
                        className="form_action_btn form_cancel_action_btn"
                    >Отменить
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddEvent;
