import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import MainLayout from "../../components/MainLayout";
import HostingsHeader from "../../components/Hostings/HostingsHeader";
import HostingsTable from "../../components/Hostings/HostingsTable";
import { hostingsReset } from "../../reducers/Hostings/actions";
import "./index.scss";

const Hostings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(hostingsReset());
        }
    }, []);

    return (
        <MainLayout>
            <section className="hostings_header_section">
                <HostingsHeader />
            </section>
            <section className="section_item">
                <HostingsTable />
            </section>
        </MainLayout>
    )
};

export default Hostings;
