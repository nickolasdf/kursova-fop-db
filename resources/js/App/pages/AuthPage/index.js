import React, { useState } from 'react';
import requests from '../../requests';
import { connect } from 'react-redux';
import { logInSuccess, setUser } from '../../reducers/Auth/actions';
import { throwAlert } from '../../reducers/App/actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.scss';

const Login = ({ logInSuccess, throwAlert, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendData = () => {
        requests.Auth.login(email, password)
            .then(resp => {
                if (resp.data.access_token && resp.data.refresh_token) {
                    logInSuccess(
                        resp.data.access_token,
                        resp.data.refresh_token
                    );
                } else {
                    throwAlert('error', 'Сервер не достуный');
                }
            })
            .then(() => {
                history.push('/profile');
            })
            .catch(error => {
                throwAlert(ERROR, 'Неправильний логін або пароль');
            });
    };
    const submitHandler = event => {
        event.preventDefault();
        sendData();
    };

    return (
        <div className="auth_page">
            <div className="container auth_page_content">
                <div className="content_block">
                    <div>
                        <form
                            method="post"
                            onSubmit={submitHandler}
                            className="auth-form"
                        >
                            <div className="auth-form__field">
                                <label className="auth_title">Email</label>
                                <TextField
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    className="text_input"
                                    name="email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="auth-form__field">
                                <label className="auth_title">Password</label>
                                <TextField
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    className=""
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="auth_footer">
                                <Button type="submit" variant="contained" color="primary">
                                    Увійти
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    logInSuccess,
    setUser,
    throwAlert
};

export default connect(
    null,
    mapDispatchToProps
)(Login);
