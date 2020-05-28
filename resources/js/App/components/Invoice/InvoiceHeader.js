import React from 'react';

import './style.scss';

/**
 * Page header component
 * @param {object} props - component props.
 * @param {function} props.invoiceSwitcher - Siwtch handler between Edit and Preview modes.
 * @param {string} props.mode - Value of the current active mode switch.
 * @param {function} props.languageSwitch - Switches form language type.
 * @param {string} props.languageMode - Value of the current language mode switch.
 */
const InvoiceHeader = ({ invoiceSwitcher, mode, languageSwitch, languageMode }) => {

    // Changes edit/previw view
    const modeSwitcher = field => invoiceSwitcher(field);
    // Changes edit form language mode
    const languageSwitcher = field => languageSwitch(field);

    const activeSwitchStyle = (field, modeValue) => {
        if (modeValue === field) {
            return 'active-switch';
        }
    };

    return (
        <div className="invoice__header-container">
            <div className="invoice__language-switch">
                <h2>Invoice</h2>

                <div className="invoice__header-switch">
                    <div
                        onClick={() => languageSwitcher('multi')}
                        className={`invoice__header-switch__section ${activeSwitchStyle('multi', languageMode)}`}
                    >Eng/Рус
                    </div>
                    <div
                        onClick={() => languageSwitcher('english')}
                        className={`invoice__header-switch__section ${activeSwitchStyle('english', languageMode)}`}
                    >Eng
                    </div>
                </div>
            </div>

            <div className="invoice__header-switch">
                <div
                    onClick={() => modeSwitcher('edit')}
                    className={`invoice__header-switch__section ${activeSwitchStyle('edit', mode)}`}
                >Редактор
                </div>
                <div
                    onClick={() => modeSwitcher('preview')}
                    className={`invoice__header-switch__section ${activeSwitchStyle('preview', mode)}`}
                >Превью
                </div>
            </div>
        </div>
    );
};

export default InvoiceHeader;
