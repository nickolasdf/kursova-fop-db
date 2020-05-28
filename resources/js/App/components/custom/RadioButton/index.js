import React from "react";
import {makeStyles} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import clsx from "clsx";

const RadioButton = ({ size = 16, ...rest }) => {
    const useStyles = makeStyles({
        root: {
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        icon: {
            borderRadius: '100%',
            width: size,
            height: size,
            backgroundColor: '#f5f8fa',
            border: "1px solid #EBEBEB",
            'input:hover ~ &': {
                backgroundColor: '#ebf1f5',
            },
            'input:disabled ~ &': {
                boxShadow: 'none',
                background: 'rgba(206,217,224,.5)',
            },
        },
        checkedIcon: {
            backgroundColor: '#ffd63c',
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
            border: "none",
            position: "relative",
            '&:before': {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: 'block',
                width: size / 2,
                height: size / 2,
                borderRadius: "100%",
                backgroundColor: "white",
                content: '""',
            },
            'input:hover ~ &': {
                backgroundColor: '#ffd63c',
            },
        },
    });

    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...rest}
        />
    );
};

export default RadioButton;
