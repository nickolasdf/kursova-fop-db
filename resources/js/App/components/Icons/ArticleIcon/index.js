import React from 'react';
import articleIcon from '../../../static/ArticleIcon.svg';
import './index.scss';

const ArticleIcon = ({ color = '', iconId = 'default', wrapperStyles = {}, iconStyles = {} }) => {
    const convertHslToHsla = (hsl = '') => {
        return `hsla(${hsl}, 0.3)`;
    };

    const styles = {
        icon: color ? { fill: `hsl(${color})`, ...iconStyles } : null,
        iconWrapper: color ? { backgroundColor: convertHslToHsla(color), ...wrapperStyles } : null
    };

    return (
        <div className="article-icon-wrapper" style={styles.iconWrapper}>
            <svg className="article-svg-icon" style={color ? styles.icon : null}>
                <use href={articleIcon + `#article-icon-${iconId}`}/>
            </svg>
        </div>
    );
};

export default ArticleIcon;
