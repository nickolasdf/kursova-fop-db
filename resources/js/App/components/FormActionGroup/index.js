import React from 'react';
import './index.scss';
import clsx from 'clsx';
import Button from '../custom/Button';

const FormActionGroup = (
    {
        onClose,
        acceptTitle = 'Сохранить',
        onAcceptClick,
        className,
        isSubmitting,
        buttonDisabled = false,
        deleteButton = null,
        onDelete = null
    }) => {

    const renderDeleteButton = () => {
        if (deleteButton) {
            return deleteButton;
        } else if (onDelete && typeof onDelete === 'function') {
            return <Button type="button" onClick={onDelete} variant="outlined">Удалить</Button>;
        } else {
            return null;
        }
    };

    return (
        <div className={clsx('form_actions_wrapper', className)}>
            <div className="form_actions_wrapper__main-actions">
                <div className="form_actions_wrapper__main-actions__item">
                    <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={buttonDisabled}
                        onClick={onAcceptClick}
                    >
                        {acceptTitle}
                    </Button>
                </div>
                <div className="form_actions_wrapper__main-actions__item">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="outlined"
                    >
                        Отменить
                    </Button>
                </div>
            </div>
            <div>
                {renderDeleteButton()}
            </div>
        </div>
    );
};

export default FormActionGroup;
