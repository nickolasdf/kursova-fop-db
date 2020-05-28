import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useRouteMatch } from "react-router-dom";
import requests from "../../requests";
import MainTitle from "../../components/MainTitle";
import "./style.scss";
import AccountsCardList from "./AccountsCardList";
import Preloader from "../../components/Preloader";
import OfficeEditForm from "./OfficeEditForm";
import CreateAccountModal from "./CreateAccountModal";

const EditOffice = () => {
    const match = useRouteMatch();
    const [office, setOffice] = useState({});
    const [currencyList, setCurrencyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOffice();
        getCurrencyList();
    }, []);

    const getOffice = () => {
        requests.Office.getOne(match.params.officeId).then(resp => {
            if(resp) {
                setOffice(resp.data);
                setIsLoading(false);
            }
        })
    };

    return (
        <MainLayout>
            {
                !isLoading ?
                    <div className="edit_office_page">
                        <section>
                            <div className="office_title">
                                <MainTitle title={`Офіс - ${office.name}`} />
                            </div>
                            <div className="currency_wrapper">
                                <OfficeEditForm officeName={office.name} officeId={office.id} updateOffice={getOffice} />
                            </div>
                        </section>
                        <section>
                            <div className="accounts_title">
                                <div>
                                    <h2>Рахунки</h2>
                                </div>
                                <div>
                                    <CreateAccountModal officeId={match.params.officeId} currencyList={currencyList} updateOffice={getOffice} />
                                </div>
                            </div>
                            <AccountsCardList accounts={office.accounts} updateOffice={getOffice} />
                        </section>
                    </div> : <Preloader />
            }
        </MainLayout>
    )
};

export default EditOffice;
