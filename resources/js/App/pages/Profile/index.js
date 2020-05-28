import React from "react";
import { connect } from 'react-redux';
import { fetchUserInfo, setUserComments } from "../../reducers/Profile/actions";
import MainTitle from "../../components/MainTitle";
import MainLayout from "../../components/MainLayout";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import AboutMe from "../../components/Profile/AboutMe"
import Avatar from "../../components/Profile/Avatar"
import CalendarProfile from "../../components/Profile/CalendarProfile"
import Languages from "../../components/Profile/Languages"
import Comments from "../../components/Comments";
import Rate from "../../components/Profile/Rate"
import RecentTransactions from "../../components/Profile/RecentTransactions"
import Revenue from "../../components/Profile/Revenue"
import SalaryChange from "../../components/Profile/SalaryChange"
import Skills from "../../components/Profile/Skills"
import VacationDuration from "../../components/Profile/VacationDuration"
import WorkedOnCompany from "../../components/Profile/WorkedOnCompany"

import "./style.scss";
import requests from "../../requests";

class DashBoard extends React.Component {
    componentDidMount() {
        this.props.fetchUserInfo();
    }
    addUserComment = (commentData) => {
        return requests.User.addComment(1, commentData).then(resp => {
            this.props.setUserComments(resp.data.comments)
        })
    };
    onCommentsChange = newComments => {
        this.props.setUserComments(newComments);
    };
    render() {
        return (
            <MainLayout>
                <MainTitle title="Профиль" />
                <div className='profile-page__container'>
                    <Grid container spacing={3} >
                        <Grid item xl={2} lg={3} md={4} xs={12}><Avatar styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={5} lg={6} md={8} xs={12}><AboutMe styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={3} lg={3} md={4} xs={12}><Skills styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={2} lg={3} md={4} xs={12}><Languages styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={2} lg={3} md={4} xs={12}><Rate styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={8} lg={6} md={12} xs={12}><Revenue styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={2} lg={3} md={6}  xs={12}><VacationDuration styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={2} lg={3} md={6} xs={12}><SalaryChange styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={8} lg={6} md={12} xs={12}><RecentTransactions styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={2} lg={4} md={4} xs={12}><WorkedOnCompany styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={6} lg={8} md={8} xs={12}>
                            <Comments
                                className="profile-page__box"
                                comments={this.props.userInfo.comments}
                                onSendComment={this.addUserComment}
                                onChange={this.onCommentsChange}
                            />
                        </Grid>
                        <Grid item xl={2} lg={4} md={6} xs={12}><CalendarProfile styleName={"profile-page__box"}/></Grid>
                        <Grid item xl={2} lg={4} md={6} xs={12}><CalendarProfile styleName={"profile-page__box"}/></Grid>
                        <Hidden mdDown={true}><Grid item xl={2} lg={4}><CalendarProfile styleName={"profile-page__box"}/></Grid></Hidden>
                    </Grid>
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo,
});

const mapDispatchToProps = {
    fetchUserInfo,
    setUserComments
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
