import requests from "../requests";

export const SelectData = () => {
    const selects = {};

    selects.statusTypes = [
        'marital_status',
        'education',
        'education_profile',
        'currency',
        'experience',
        'type_of_employment',
        'language',
        'language_level',
        'skill',
        'skill_level',
        'rank',
        'department',
        'available',
        'transaction_type',
        'transaction_status',
        'account_type'
    ];

    selects.getEnums = (types = []) => {
        return requests.Enum.get(types)
            .then(resp => {
                if (resp.data.data){
                    selects.transform(resp.data.data)
                }
            })
    };

    selects.getOffices = () => {
        return requests.Office.get()
            .then(resp => {
                if (resp.data ){
                    let tmp =  resp.data.map(item => ({label: item.name, value: item.id}));
                    selects['offices'] = tmp
                }
            })
    };

    selects.getRoles = () => {
        return requests.Role.get()
            .then(resp => {
                if (resp.data.data ){
                    selects['roles'] = resp.data.data
                }
            })
    };

    selects.transform = (data = {}) => {
        Object.keys(data).forEach(item => {
            let tmp =  data[item].map(itemData => ({label: itemData.value, value: itemData.id}));
            tmp.push({label: 'відсутній', value: ''})
            selects[item] = tmp
        })
    };

    selects.getPropertyByName = (string = '') => selects.hasOwnProperty(string) ? selects[string] : null

    return selects;
};
