import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './pages/AuthPage';
import { logInFailure, logInSuccess, logOut, setUser } from './reducers/Auth/actions';
import { throwAlert } from './reducers/App/actions';
import { connect } from 'react-redux';
import PrivateRoute from './routes/PrivateRoute';
import Customers from './pages/Customers';
import './App.scss';
import requests from './requests';
import GuestRoute from './routes/GuestRoute';
import SnackBar from './components/SnackBar';
import Users from './pages/Users';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Dashboard from './pages/Dashboard';
import NewCandidate from './pages/NewCandidate';
import Settings from './pages/Settings';
import Vacancies from './pages/Vacancies';
import CandidateList from './pages/CandidateList';
import CandidateAdd from './pages/CandidateAdd';
import CandidateEdit from './pages/CandidateEdit';
import ProjectList from './pages/ProjectList';
import PageNotFound from './pages/PageNotFound';
import history from './history';
import EditUserProfile from './pages/EditUserProfile';
import moment from 'moment';
import ProjectEdit from './pages/ProjectEdit';
import ContragentEdit from './pages/ContragentEdit';
import Hostings from './pages/Hostings';
import Servers from './pages/Servers';
import Invoice from './pages/Invoice';
import Calendar from './pages/Calendar';
import InvoiceSettings from './pages/InvoiceSettings';
import InvoiceCustomers from './pages/InvoiceCustomers/InvoiceCustomers';
import Invoices from './pages/Invoices/Invoices';

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
                        <PrivateRoute
                            path="/dashboard"
                            component={Dashboard}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/project"
                            component={ProjectList}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/project/:projectId"
                            component={ProjectEdit}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/candidates/edit/:id"
                            component={CandidateEdit}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/candidates/add"
                            component={CandidateAdd}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/candidates"
                            component={CandidateList}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/new-candidate"
                            component={NewCandidate}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/customers"
                            component={Customers}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/customers/:contragentId"
                            component={ContragentEdit}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/profile/edit"
                            component={ProfileEdit}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/profile"
                            component={Profile}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/users"
                            component={Users}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/users:params"
                            component={Users}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            exact
                            path="/settings"
                            component={Settings}
                            roles={null}
                        />
                        <PrivateRoute
                            path="/edit-user/:userId"
                            component={EditUserProfile}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/vacancies"
                            component={Vacancies}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/hostings"
                            component={Hostings}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/servers"
                            component={Servers}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/invoice"
                            component={Invoice}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/calendar"
                            component={Calendar}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/invoice-settings"
                            component={InvoiceSettings}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/invoice-customers"
                            component={InvoiceCustomers}
                            roles={null}
                            exact
                        />
                        <PrivateRoute
                            path="/invoices"
                            component={Invoices}
                            roles={null}
                            exact
                        />

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
