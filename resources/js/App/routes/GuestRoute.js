import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            !rest.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/admin', state: { from: props.location } }}/>
        )}
        />
    );
};

const mapStateToProps = ({ Auth }) => ({
    isAuthenticated: Auth.isAuthenticated
});

export default connect(mapStateToProps)(GuestRoute);
