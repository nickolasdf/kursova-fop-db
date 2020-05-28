import React from "react";

import DomainIcon from "../../Icons/DomainIcon";
import WebsiteIcon from "../../Icons/WebsiteIcon";
import "./HostingsTableSitesList.scss";


const HostingsTableSitesList = ({ sites = [], hostingData = {}}) => {
    const onClick = event => {
        event.stopPropagation();
    };

    const convertLink = (name = "") => {
        const http = "http://";
        if(name.includes(http) || name.includes(http)) {
            return name;
        }
        else {
            return http.concat(name)
        }
    };

    return (
        <ul className="hostings_table_sites_list">
            {
                sites.map(item => {
                    return (
                        <li key={item.id}>
                            <a href={convertLink(item.name)} target="_blank" onClick={onClick}>{item.name}</a>
                        </li>
                    )
                })
            }
            {
                (hostingData.access_domain || hostingData.access_hosting) &&
                    <div className="hostings_table__access-wrapper">
                        {hostingData.access_domain && <span className="hostings_table__access-icon"><DomainIcon /></span>}
                        {hostingData.access_hosting && <span className="hostings_table__access-icon"><WebsiteIcon /></span>}
                    </div>
            }
        </ul>
    )
};

export default HostingsTableSitesList;
