import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { columns } from "./utils";
import requests from "../../requests";
import VacancyEditModal from "./VacancyEditModal";
import { connect } from "react-redux";

const VacanciesTable = props => {
    const [vacancyModalOpen, setVacancyModalOpen] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [currencyList, setCurrencyList] = useState([]);
    const [employmentList, setEmploymentList] = useState([]);

    useEffect(() => {
        requests.Enum.get({ types: ["currency", "type_of_employment"] }).then(
            resp => {
                setCurrencyList(resp.data.data.currency);
                setEmploymentList(resp.data.data.type_of_employment);
            }
        );
    }, []);

    return (
        <>
            <MaterialTable
                columns={columns}
                data={query =>
                    new Promise((resolve, reject) => {
                        const config = {
                            order_field: query.orderBy && query.orderBy.field,
                            order_type: query.orderDirection.toUpperCase(),
                            per_page: query.pageSize,
                            page: query.page + 1
                        };
                        requests.Vacancies.getAll({ params: config }).then(
                            resp => {
                                if (resp) {
                                    resolve({
                                        data: resp.data.data,
                                        page: resp.data.meta.current_page - 1,
                                        totalCount: resp.data.meta.total
                                    });
                                }
                            }
                        );
                    })
                }
                options={{
                    search: false,
                    toolbar: false,
                    actionsColumnIndex: -1,
                    sorting: true,
                    showFirstLastPageButtons: false,
                    defaultSort: "asc",
                    pageSizeOptions: [
                        10,
                        20,
                        50,
                        props.Vacancies.data.length,
                        "ВСЕ"
                    ],
                    pageSize: 20
                }}
                onRowClick={async (event, rowData) => {
                    await setRowData(rowData);
                    await setVacancyModalOpen(true);
                }}
                localization={{
                    header: {
                        actions: null
                    },
                    pagination: {
                        labelDisplayedRows: "{from}-{to} з {count}",
                        labelRowsSelect: "строк на страницу"
                    }
                }}
                onChangePage={page => {
                    setTableConfig({
                        ...tableConfig,
                        page
                    });
                }}
            />
            <VacancyEditModal
                isOpen={vacancyModalOpen}
                onClose={() => setVacancyModalOpen(false)}
                data={rowData}
                cities={props.cities}
                user={props.user}
                currencyList={currencyList}
                employmentList={employmentList}
            />
        </>
    );
};

const mapStateToProps = ({ Vacancies }) => {
    return {
        Vacancies
    };
};

export default connect(mapStateToProps)(VacanciesTable);
