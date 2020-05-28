export const hostingsTableColumns = [
    {
        label: 'Сайт',
        field: 'site',
        isFilter: true
    },
    {
        label: 'ФИО владельца',
        field: 'customerName',
        isFilter: true
    },
    {
        label: 'Контактный телефон',
        field: 'customerPhone',
        isFilter: true
    },
    {
        label: 'Контактный е-майл',
        field: 'customerEmail'
    },
    {
        label: 'Сервер',
        field: 'serverName'
    },
    {
        label: 'Тариф хостинга',
        field: 'expense'
    },
    {
        label: 'Окончание хостинга',
        field: 'expired_at'
    }
];

export const hostingModalTabs = [
    {
        id: 0,
        label: 'Данные о клиенте'
    },
    {
        id: 1,
        label: 'Доступы'
    },
    {
        id: 2,
        label: 'Логи оплаты'
    }
];
export const multiChangeHostingTabs = [
    {
        id: 0,
        label: 'Сменить сервер'
    },
    {
        id: 1,
        label: 'Сменить тариф'
    }
];
