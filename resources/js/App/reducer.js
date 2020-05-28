import { combineReducers } from "redux";
import Auth from "./reducers/Auth";
import AccountItems from "./reducers/AccountItems";
import App from "./reducers/App";
import Transactions from "./reducers/Transactions";
import Dashboard from "./reducers/Dashboard";
import Customers from "./reducers/Customers";
import Chart from "./reducers/Chart";
import Profile from "./reducers/Profile";
import CandidateList from "./reducers/CandidateList";
import CandidateEdit from "./reducers/CandidateEdit";
import ProjectList from "./reducers/ProjectList";
import Vacancies from "./reducers/Vacancies";
import Cities from "./reducers/Cities";
import Currencies from "./reducers/Currencies";
import EmploymentTypes from "./reducers/EmploymentTypes";
import Hostings from "./reducers/Hostings";
import Servers from "./reducers/Servers";
import HostingStatistics from "./reducers/HostingStatistics";
import Users from "./reducers/Users";

export default combineReducers({
    Auth,
    App,
    AccountItems,
    Transactions,
    Dashboard,
    Chart,
    Profile,
    CandidateList,
    CandidateEdit,
    ProjectList,
    Vacancies,
    Cities,
    Currencies,
    EmploymentTypes,
    Customers,
    Hostings,
    Servers,
    HostingStatistics,
    Users
});
