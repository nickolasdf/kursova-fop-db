import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './pages/AuthPage';
import { logInFailure, logInSuccess, logOut, setUser } from './reducers/Auth/actions';
import { throwAlert } from './reducers/App/actions';
import { connect } from 'react-redux';
import './App.scss';
import requests from './requests';
import GuestRoute from './routes/GuestRoute';
import SnackBar from './components/SnackBar';
import PageNotFound from './pages/PageNotFound';
import history from './history';
import moment from 'moment';

class App extends React.Component {
    constructor(props) {
        super(props);
        moment.locale('uk');
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken) {
            this.props.logInSuccess(accessToken, refreshToken);
        } else {
            this.props.logInFailure();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.isAuthenticated !== this.props.isAuthenticated &&
            this.props.isAuthenticated
        ) {
            requests.User.me().then(resp => {
                this.props.setUser(resp.data);
            });
        }
    }

    render() {
        return (
            <div className="App">
                <SnackBar/>
                <Router history={history}>
                    <Switch>
                        <GuestRoute exact path="/" component={Login}/>
                        <Route exact path="/404" component={PageNotFound}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapDispatchToProps = {
    logInSuccess,
    logInFailure,
    logOut,
    setUser,
    throwAlert
};

const mapStateToProps = ({ Auth }) => ({
    user: Auth.user,
    isAuthenticated: Auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
