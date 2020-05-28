import React from 'react';
import ReactSelect, { components } from 'react-select';
import LightTooltip from '../LightTooltip';
import { Tooltip } from '@material-ui/core';
import './index.scss';
import PlusIcon from '../../Icons/PlusIcon';
import Preloader from '../../Preloader';
import Button from '../Button';

const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary25: '#FFD63C',
        primary: '#FFD63C'
    }
});

const customStyles = (styles, errorStyles) => ({
    control: (theme, state) => {
        const focusedStyles = () => {
            if (state.isFocused) {
                return {
                    border: '1px solid #ffd63c',
                    zIndex: 2,
                    boxShadow: 'inset 0 0 4px 0 rgba(255,214,60,1), 0 0 4px 0 rgba(255,214,60,1)'
                };
            } else {
                return {};
            }
        };
        return {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: 'solid 1px #e0e0e0',
            width: '100%',
            height: '100%',
            minHeight: '50px',
            backgroundColor: 'white',
            fontSize: '14px',
            padding: '0 8px',
            ...focusedStyles(),
            ...styles.control,
            ...errorStyles
        };
    },
    menu: theme => ({
        ...theme,
        position: 'absolute',
        zIndex: 99999,
        ...styles.menu
    }),
    indicatorSeparator: () => undefined,
    indicatorsContainer: () => ({
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    dropdownIndicator: theme => ({
        ...theme,
        justifyContent: 'center'
    })
});

const Select = ({
    styles = {},
    isError = false,
    errorMessage = '',
    onAddClick,
    addButtonTooltip = 'Добавить',
    customComponents,
    isLoading = false,
    ...rest
}) => {
    const errorStyles = (error) => {
        if (error) {
            return {
                position: 'relative',
                border: '1px solid #ff5454',
                zIndex: 2,
                boxShadow: 'inset 0 0 4px 0 rgba(255,84,84,1), 0 0 4px 0 rgba(255,84,84,1)',
                '&:focus': {
                    border: '1px solid #ff5454',
                    boxShadow: 'inset 0 0 4px 0 rgba(255,84,84,1), 0 0 4px 0 rgba(255,84,84,1)'
                }
            };
        } else {
            return {};
        }
    };

    const menuComponent = props => {
        return (
            <components.Menu {...props}>
                {
                    props.children
                }
                {
                    onAddClick &&
                    <div className="custom_select_icon_add_wrapper">
                        <Tooltip title={addButtonTooltip}>
                            <Button className="custom-select-add-btn" onClick={onAddClick}><PlusIcon/></Button>
                        </Tooltip>
                    </div>
                }
            </components.Menu>
        );
    };

    const indicatorsContainerComponent = props => {
        return (
            <components.IndicatorsContainer {...props}>
                {
                    isLoading &&
                    <components.IndicatorsContainer {...props}>
                        <Preloader currentColor={true} size={20}/>
                    </components.IndicatorsContainer>
                }
                {
                    props.children
                }
            </components.IndicatorsContainer>
        );
    };
    return (
        <LightTooltip title={errorMessage} placement="right" open={isError}>
            <ReactSelect
                theme={selectTheme}
                styles={customStyles(styles, errorStyles(isError))}
                components={{
                    Menu: menuComponent,
                    IndicatorsContainer: indicatorsContainerComponent,
                    ...customComponents
                }}
                {...rest}
            />
        </LightTooltip>
    );
};

export default Select;
