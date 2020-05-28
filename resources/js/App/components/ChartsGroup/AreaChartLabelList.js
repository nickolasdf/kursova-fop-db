import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./AreaChartLabelList.scss";

const createData = (data) => {
    const {expense, income} = data;

    return [
        {
            color: expense.before.color,
            name: expense.before.id,
            id: 1
        },
        {
            color: expense.after.color,
            name: expense.after.id,
            id: 2
        },
        {
            color: income.before.color,
            name: income.before.id,
            id: 3
        },
        {
            color: income.after.color,
            name: income.after.id,
            id: 4
        }
    ]
};

const AreaChartLabelList = ({ data, isLoading }) => {

    return (
        <>
            {
                !isLoading &&
                <ul className="area_chart_label_list">
                    {
                        createData(data).map(item => {
                            return (
                                <li key={item.id}>
                                    <div
                                        style={{
                                            backgroundColor: item.color,
                                            borderRadius: "100%",
                                            width: "8px",
                                            height: "8px"
                                        }}
                                    >
                                    </div>
                                    <span className="label_name">
                                        {
                                            item.name
                                        }
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </>
    )
};

const mapStateToProps = ({ Chart }) => ({
    isLoading: Chart.loading,
    data: Chart.data
});

export default connect(mapStateToProps)(AreaChartLabelList);
