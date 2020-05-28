import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import CheckIcon from '@material-ui/icons/Check';

import ColorItem from '../ColorItem';
import LightTooltip from '../LightTooltip';
import './index.scss';

const styles = {
    colorItem: {
        border: '2px solid #ffffff'
    },
    selectedColor: {
        border: '2px solid #FFD63C'
    }
};

const ColorPicker = ({
    colors = [], onChange = () => {
    }, isError = false, errorMessage = '', value = null
}) => {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const handleClick = color => event => {
        event.preventDefault();
        if (!value) {
            setSelected(color);
        }
        onChange(color);
    };

    return (
        <LightTooltip open={isError} title={errorMessage}>
            <div
                className={clsx('color_picker_wrapper', {
                    ['color_picker_error']: isError
                })}
            >
                {
                    colors.map(color => {
                        return (
                            <div key={color} className="color_picker_item">
                                <button className="color_picker_item__btn" onClick={handleClick(color)}>
                                    <ColorItem
                                        color={color}
                                        styles={styles.colorItem}
                                        size="2.5rem"
                                    />
                                    {
                                        selected === color &&
                                        <div className="color_picker_item__check-mark">
                                            <CheckIcon className="color_picker_item__check-icon"/>
                                        </div>
                                    }
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </LightTooltip>
    );
};

export default ColorPicker;
