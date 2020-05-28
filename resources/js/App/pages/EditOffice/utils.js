export const createCurrencySelectData = (data) => {
    return data.map(item => ({
        value: item.id,
        label: item.value
    }))
};
