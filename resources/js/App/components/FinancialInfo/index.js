import React from "react";
import InfoBox from "../InfoBox";
import "./style.scss";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const FinancialInfo = ({ offices }) => (
    <div className="financial-info">
        {!offices ? (
            <div>Loading...</div>
        ) : (
            <Grid container>
                {
                    offices.map(office => (
                        <Grid key={office.id} item xs={6}>
                            <InfoBox office={office} />
                        </Grid>
                    ))
                }
            </Grid>
        )}
    </div>
);

const mapStateToProps = state => {
    return {
        offices: state.Dashboard.data.offices
    };
};

export default connect(mapStateToProps)(FinancialInfo);
