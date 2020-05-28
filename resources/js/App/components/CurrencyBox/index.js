import React from "react";
import { connect } from "react-redux";
import "./style.scss";
import CurrencyWrapper from "./CurrencyWrapper";
import requests from "../../requests";

class CurrencyBox extends React.Component {
    state = {
        currencyData: []
    };

    componentDidMount() {
        this.getCurrency();
    }

    getCurrency = () => {
        requests.Currency.get().then(resp => {
            this.setState({ currencyData: resp.data })
        })
    };

    render() {
        return(
            <div className="dashboard_currency_block">
                {
                    this.state.currencyData.map(item => (
                        <CurrencyWrapper
                            key={item.currencyValue}
                            updateCurrency={this.getCurrency}
                            currencySymbol={item.currencySymbol}
                            rate={item.rate}
                            id={item.id}
                        />
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = ({ Dashboard }) => ({
    dashboardData: Dashboard.data
});

export default connect(mapStateToProps)(CurrencyBox);
