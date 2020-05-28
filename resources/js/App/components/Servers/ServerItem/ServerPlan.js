import React from "react";
import RadioButton from "../../custom/RadioButton";
import clsx from "clsx";

const ServerPlan = ({ checked = false, amount = 0, planText = "" }) => {
    return (
        <div
            className={clsx("server_item_plan", {
                ["server_item_plan_transparent"]: !checked
            })}
        >
            <RadioButton checked={checked} size={20} />
            <div className="server_item_plan_group">
                <div className="server_item_plan_title">{amount} ₴</div>
                <div>{planText}</div>
            </div>
        </div>
    )
};

export default ServerPlan;
