import React, { forwardRef } from 'react';
import './index.scss';
import ErrorIcon from '@material-ui/icons/Error';
import LightTooltip from '../LightTooltip';
import clsx from 'clsx';

const Input = forwardRef((props, ref) => {
    const {
        errorMessage = '',
        isError = false,
        className = '',
        type = 'text',
        ...rest
    } = props;

    if (type === 'textarea') {
        return (
            <textarea className={clsx(className, 'custom_textarea_root')} {...rest} />
        );
    } else {
        return (
            <div className="custom_input_wrapper">
                <input
                    className={clsx(className, 'custom_input_root', {
                        ['custom_input_error']: isError
                    })}
                    ref={ref}
                    {...rest}
                />
                {
                    isError &&
                    <>
                        <div className="custom_input_error_icon">
                            {
                                isError &&
                                <LightTooltip
                                    open={isError}
                                    title={errorMessage}
                                    placement="right"
                                >
                                    <ErrorIcon/>
                                </LightTooltip>
                            }
                        </div>
                    </>
                }
            </div>
        );
    }
});

export default Input;
