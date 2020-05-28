import React, { useEffect, useState } from 'react';
import ArticleIcon from '../../Icons/ArticleIcon';
import './index.scss';

const styles = {
    iconWrapper: {
        borderRadius: 4
    }
};

const IconPicker = ({ color = '', onChange, icons = [], iconPath, value }) => {
    const [selected, setSelected] = useState();
    console.log(value);
    useEffect(() => {
        setSelected(value);
    }, [value]);

    const handleClick = icon => () => {
        if (color) {
            setSelected(icon);
            onChange(icon);
        }
    };

    return (
        <div className="icon-picker">
            {
                icons.map(id => {
                    return (
                        <button
                            key={id}
                            type="button"
                            className="icon-picker__item"
                            onClick={handleClick(id)}
                        >
                            <ArticleIcon
                                color={id === selected ? color : ''}
                                iconId={id}
                                wrapperStyles={styles.iconWrapper}
                                path={iconPath}
                            />
                        </button>
                    );
                })
            }
        </div>
    );
};

export default IconPicker;
