import React from 'react';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import './index.scss';
import requests from '../../../requests';
import { getFops } from '../../../reducers/FopList/actions';
import { throwAlert } from '../../../reducers/App/actions';
import { SUCCESS } from '../../../config/alertVariants';
import { useHistory } from "react-router-dom"

const FopList = ({ data = [] }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteFop = id => () => {
        requests.Fop.delete(id).then(() => {
            dispatch(throwAlert(SUCCESS, 'ФОП успішно видалений'));
            dispatch(getFops());
        });
    };

    const handleClickRow = id => () => {
        history.push(`/fop/${id}`)
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ПІБ</TableCell>
                        <TableCell align="left">Адреса</TableCell>
                        <TableCell align="left">КВЕДи</TableCell>
                        <TableCell align="left">Реєстраційний номер</TableCell>
                        <TableCell align="left">Місце реєстрації</TableCell>
                        <TableCell align="left">Дата реєстрації</TableCell>
                        <TableCell align="left">Номер телефону</TableCell>
                        <TableCell align="left">Електронна пошта</TableCell>
                        <TableCell align="left">Податковий номер</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map(item => {
                            return (
                                <TableRow style={{ cursor: "pointer" }} key={item.id} onClick={handleClickRow(item.id)}>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.address}</TableCell>
                                    <TableCell align="left">{item.activities.map(activity => activity + ' ')}</TableCell>
                                    <TableCell align="left">{item.registrationNumber}</TableCell>
                                    <TableCell align="left">{item.registerLocation}</TableCell>
                                    <TableCell align="left">{item.registrationDate}</TableCell>
                                    <TableCell align="left">{item.phone}</TableCell>
                                    <TableCell align="left">{item.email}</TableCell>
                                    <TableCell align="left">{item.taxNumber}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Видалити ФОПа">
                                            <IconButton onClick={deleteFop(item.id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FopList;
