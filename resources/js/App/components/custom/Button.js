import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Preloader from '../Preloader';

import './index.scss';

/**
 * Reusable button component
 * @param {object} props - component props.
 * @param {function} props.onClick - function to execute.
 * @param {object} props.className - custom class.
 * @param {function} props.icon - button inner icon
 * @param {boolean} props.marginHorizontal - determines if we need to add
 * horizontal margin.
 * @param {string} props.type - adds button color style.
 * @param {boolean} props.loading - shows loading spinner.
 */
const Button = forwardRef(({
    children,
    onClick,
    marginHorizontal,
    variant,
    className,
    icon,
    loading = false,
    ...rest
}, ref) => {

    const renderIcon = () => {
        return icon ? <span className="button__icon">{icon}</span> : null;
    };

    const addMargin = marginHorizontal ? 'horizontal-margin' : null;

    return (
        <button
            className={clsx('button', className, addMargin, variant ? `button__${variant}` : null)}
            onClick={onClick}
            ref={ref}
            {...rest}
        >
            <div className={loading ? 'button__hide-content' : null}>
                {children}
                {renderIcon()}
            </div>
            {
                loading &&
                <div className="button__spinner">
                    <Preloader size="1rem" currentColor={true}/>
                </div>
            }
        </button>
    );
});

export default Button;
