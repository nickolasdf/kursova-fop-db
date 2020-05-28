 export const createContractorsData = data => {
    if(data) {
        return data.map(item => {
            return {
                value: item.value,
                label: `${item.label}`
            }
        })
    }
    else
        return [];
};
 export const createProjectsData = data => {
    if(data) {
        return data.map(item => {
            return {
                value: item.value,
                label: `${item.label}`
            }
        })
    }
    else
        return [];
};
export const getTransactionType = (types, name) => {
    return types.find((item) => {
        return item.name === name;
    })
};
