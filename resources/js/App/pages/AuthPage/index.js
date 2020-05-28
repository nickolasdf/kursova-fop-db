import React, { useState } from "react";
import requests from "../../requests";
import { connect } from "react-redux";
import { logInSuccess, setUser } from "../../reducers/Auth/actions";
import { throwAlert } from "../../reducers/App/actions";
import { ERROR } from "../../config/alertVariants";
import "./style.scss";

const Login = ({ logInSuccess, throwAlert, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const sendData = () => {
        requests.Auth.login(email, password)
            .then(resp => {
                if (resp.data.access_token && resp.data.refresh_token) {
                    logInSuccess(
                        resp.data.access_token,
                        resp.data.refresh_token
                    );
                } else throwAlert("error", "Сервер не достуный");
            })
            .then(() => {
                history.push("/profile");
            })
            .catch(error => {
                throwAlert(ERROR, "Неправильний логін або пароль");
            });
    };
    const submitHandler = event => {
        event.preventDefault();
        sendData();
    };

    return (
        <div className="auth_page">
            <div className="container auth_page_content">
                <div>
                    <header>
                        <div className="logo_block">
                            <img src="img/logo.png" />
                        </div>
                    </header>
                </div>

                <div className="content_block">
                    <div className="home_page_title">
                        <div>УДОБНАЯ СИСТЕМА</div>
                        <div>УПРАВЛЕНИЯ ПРОЕКТАМИ</div>
                    </div>
                    <div>
                        <form
                            method="post"
                            onSubmit={submitHandler}
                            className="auth_form"
                        >
                            <label className="auth_title">Email</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                className="text_input"
                                name="email"
                                type="email"
                                required
                            />
                            <label className="auth_title">Password</label>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                className="text_input"
                                name="password"
                                type="password"
                                required
                            />
                            <div className="auth_footer">
                                <button className="login_btn" type="submit">
                                    Log in
                                </button>
                                <div>
                                    <a className="auth_right_text" href="#">
                                        Forgot Your Password?
                                    </a>
                                </div>
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
