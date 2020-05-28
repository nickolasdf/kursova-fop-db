export const createCurrencySelectData = (data) => {
    return data.map(item => ({
        value: item.id,
        label: item.value
    }))
};
export const officeFormValues = {
    name: "",
    phone: "",
    email: "",
    site: "",
    index: "",
    city: "",
    address: ""
};
export const accountFormValues = {
    amount: "",
    name: "",
    description: ""
};
export const accountItemsTableColumns = [
    {
        label: "Статья",
        field: "name"
    },
    {
        label: "",
        field: ""
    },
    {
        label: "Цвет",
        field: "color"
    }
];
export const officeFromStructure = [
    {
        id: 1,
        title: null,
        sectionInputs: [
            {
                id: 1,
                field: "name",
                label: "Название",
                placeholder: "Введите название..."
            }
        ]
    },
    {
        id: 2,
        title: "Контактная информация",
        sectionInputs: [
            {
                id: 1,
                field: "phone",
                label: "Телефон",
                placeholder: "Введите номер телефона..."
            },
            {
                id: 2,
                field: "email",
                label: "Почта",
                placeholder: "Введите ваш ел. адрес..."
            },
            {
                id: 3,
                field: "site",
                label: "Сайт",
                placeholder: "Введите сайт..."
            }
        ]
    },
    {
        id: 3,
        title: "Юридический адрес",
        sectionInputs: [
            {
                id: 1,
                field: "index",
                label: "Индекс",
                placeholder: "Введите почтовый индекс..."
            },
            {
                id: 2,
                field: "city",
                label: "Город",
                placeholder: "Введите город..."
            },
            {
                id: 3,
                field: "address",
                label: "Адрес",
                placeholder: "Введите адрес..."
            }
        ]
    }

];

