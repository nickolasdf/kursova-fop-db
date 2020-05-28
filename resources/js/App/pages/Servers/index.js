import React, {useEffect} from "react";
import { useDispatch } from "react-redux";

import MainLayout from "../../components/MainLayout";
import MainTitle from "../../components/MainTitle";
import ServersList from "../../components/Servers/ServersList";
import { getServers } from "../../reducers/Servers/actions";

const Servers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServers());
    }, []);

    return (
        <MainLayout>
            <section className="section_item">
                <MainTitle title="Сервера" />
            </section>
            <section className="section_item">
                <ServersList />
            </section>
        </MainLayout>
    )
};

export default Servers;
