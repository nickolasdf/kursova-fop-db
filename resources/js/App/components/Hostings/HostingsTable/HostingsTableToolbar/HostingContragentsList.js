import React, {useState, useEffect} from "react";
import "./HostingCustomerList.scss";
import requests from "../../../../requests";

const testList = [
    {
        id: 1,
        name: "Роман Нечипорук",
        serverName: "Текущий сервер H-75394 \\ eVPS-32"
    },
    {
        id: 2,
        name: "Пітцик Наталія",
        serverName: "Текущий сервер H-75394 \\ eVPS-32"
    },
    {
        id: 3,
        name: "Олександр Петрянич",
        serverName: "Dedicated-18192"
    }
    ,{
        id: 4,
        name: "Полупан Олександра Анатоліївна",
        serverName: "Текущий сервер H-75394 \\ eVPS-32"
    },
    {
        id: 5,
        name: "Андрій Юнко",
        serverName: "Dedicated-18192"
    },
    {
        id: 6,
        name: "Ярослав Меденець",
        serverName: "Текущий сервер H-75394 \\ eVPS-32"
    }
];

const HostingCustomersList = ({ selected }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        requests.Hostings.getSelected({ params: { ids: selected} }).then(resp => {
            setCustomers(resp.data)
        })
    }, []);

    return (
        <div className="hosting-customers">
            <div className="hosting-customers__item">
                <h3 className="hosting-customers__title" >Контрагенты ({customers.length})</h3>
            </div>
            <div className="hosting-customers__block-list">
                {
                    customers.map(item => {
                        return (
                            <div key={item.id} className="hosting-customers__item">
                                <span className="hosting-customers__item__name">{item.customerName}</span>
                                <span className="hosting-customers__item__server">{item.serverName}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default HostingCustomersList;
