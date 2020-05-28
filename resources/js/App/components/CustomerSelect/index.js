import React from 'react';
import { components } from 'react-select';
import Select from '../custom/Select';
import './index.scss';

const CustomerSelectItem = ({ data }) => {
    return (
        <div className="customer-select__item">
            <a
                href={`/customers/${data.value}`}
                target="_blank"
            >{data.label}</a>
            <div className="customer-select__number">{data.phone}</div>
        </div>
    );
};

const CustomerSelect = props => {
    return (
        <Select {...props} customComponents={{
            Option: (optionProps) => {
                return (
                    <components.Option {...optionProps}>
                        <CustomerSelectItem data={optionProps.data}/>
                    </components.Option>
                );
            },
            SingleValue: (valueContainerProps) => {
                return (
                    <components.SingleValue {...valueContainerProps}>
                        {
                            valueContainerProps.data ?
                                <CustomerSelectItem data={valueContainerProps.data}/> :
                                valueContainerProps.children
                        }
                    </components.SingleValue>
                );
            }
        }}
        />
    );
};

export default CustomerSelect;
