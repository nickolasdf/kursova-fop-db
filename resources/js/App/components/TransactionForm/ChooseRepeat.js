import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Popover } from '@material-ui/core';
import './ChooseRepeat.scss';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        backgroundColor: '#F5F8FA',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2
        },
        'input:hover ~ &': {
            backgroundColor: '#EBF1F5'
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)'
        }
    },
    checkedIcon: {
        backgroundColor: '#FFD63C',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""'
        },
        'input:hover ~ &': {
            backgroundColor: '#FFD63C'
        }
    }
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}/>}
            icon={<span className={classes.icon}/>}
            {...props}
        />
    );
}

class ChooseRepeat extends React.Component {
    state = {
        repeatBy: 'week',
        freq: 1
    };

    handleChange = field => event => {
        this.setState({ [field]: event.target.value });
    };

    handleSave = () => {
        const { onClose, onSave } = this.props;
        onSave({
            repeatBy: this.state.repeatBy,
            freq: this.state.freq
        });
        onClose();
    };

    render() {
        const {
            open,
            onClose,
            anchorEl
        } = this.props;

        return (
            <Popover open={open} onClose={onClose} anchorEl={anchorEl}>
                <div className="choose_repeat_wrapper">
                    <FormControl component="fieldset">
                        <RadioGroup
                            onChange={this.handleChange('repeatBy')}
                            value={this.state.repeatBy}
                            aria-label="gender"
                            name="customized-radios"
                        >
                            <input
                                defaultValue={this.state.freq}
                                className="input_date_freq repeat_menu_item"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Кількість повторень"
                                onChange={this.handleChange('freq')}
                            />
                            <FormControlLabel
                                className="repeat_menu_item"
                                value="week"
                                control={<StyledRadio/>}
                                label="Неделя"
                            />
                            <FormControlLabel
                                className="repeat_menu_item"
                                value="month"
                                control={<StyledRadio/>}
                                label="Месяц"
                            />
                            <FormControlLabel
                                className="repeat_menu_item"
                                value="year"
                                control={<StyledRadio/>}
                                label="Год"
                            />
                        </RadioGroup>
                    </FormControl>
                    <button className="repeat_save_btn" onClick={this.handleSave}>Сохранить</button>
                </div>
            </Popover>
        );
    }
}

export default ChooseRepeat;
