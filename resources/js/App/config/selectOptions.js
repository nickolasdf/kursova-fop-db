export const createAccountsData = data => {
    if (data) {
        return data.map(item => {
            return {
                value: item.id,
                currency: item.currencyValue,
                label: `${item.typeName} - ${item.total} ${item.currencyName}`,
                currencySymbol: item.currencySymbol
            };
        });
    } else {
        return [];
    }
};
export const createAccountItemsData = data => {
    if (data) {
        const parentArray = data.filter(item => !item.parent_id);
        const childArray = data.filter(item => item.parent_id);
        let newData = [];

        parentArray.forEach(parentItem => {
            newData.push(parentItem);

            childArray.forEach(childItem => {
                if (childItem.parent_id === parentItem.id) {
                    newData.push(childItem);
                }
            });
        });

        return newData.map(item => {
            return {
                value: item.id,
                label: `${item.name}`,
                widget: item.widget,
                parentId: item.parent_id
            };
        });
    } else {
        return [];
    }
};
export const createEnumData = data => {
    if (data) {
        return data.map(item => {
            return {
                value: item.id,
                label: item.value
            };
        });
    } else {
        return [];
    }
};
export const createCustomersData = data => {
    if (data) {
        return data.map(item => {
            return {
                value: item.id,
                label: item.name,
                phone: item.phone
            };
        });
    } else {
        return [];
    }
};
export const createUsersData = data => {
    if (data) {
        return data.map(item => {
            return {
                value: item.id,
                label: item.name
            };
        });
    } else {
        return [];
    }
};
export const createSelectData = data => {
    if (data) {
        return data.map(item => {
            return {
                value: item.id,
                label: item.name
            };
        });
    } else {
        return [];
    }
};
