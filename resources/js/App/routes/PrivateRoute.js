import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import Preloader from "../components/Preloader";

const PrivateRoute = ({ component: Component, roles: roles, ...rest }) => {

    const userHasRole = (user, roles) => {

        let userHasRole = false;

        if (roles) {

            user.roles.forEach((userRole) => {
                if (roles && roles.indexOf(userRole) !== -1) {
                    userHasRole = true;
                }
            });

            return userHasRole;

        } else {

            return true;
        }
    };

    return (
        <Route
            {...rest}
            render={props =>
                rest.isAuthenticated ? (
                    rest.user ? (
                        userHasRole(rest.user, roles) ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{ pathname: "/403", state: { from: props.location } }}
                            />
                        )
                    ) : (
                        <Preloader />
                    )
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = ({ Auth }) => ({
    isAuthenticated: Auth.isAuthenticated,
    user: Auth.user
});

export default connect(mapStateToProps)(PrivateRoute);
