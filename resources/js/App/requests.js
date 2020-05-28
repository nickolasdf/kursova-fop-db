import axios from 'axios';
import { handleStatus } from './config/handleStatus';

const API_ROOT = 'api';

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

const requests = {
    del: (url, body) =>
        axios.delete(`/${API_ROOT}${url}`, body).catch(error => {
            handleStatus(error.response.status);
            throw error;
        }),
    get: (url, body) => {
        return axios.get(`/${API_ROOT}${url}`, body).catch(error => {
            handleStatus(error.response.status);
            throw error;
        });
    },
    put: (url, body) =>
        axios.put(`/${API_ROOT}${url}`, body).catch(error => {
            handleStatus(error.response.status);
            throw error;
        }),
    patch: (url, body) =>
        axios.patch(`/${API_ROOT}${url}`, body).catch(error => {
            handleStatus(error.response.status);
            throw error;
        }),
    post: (url, body) =>
        axios.post(`/${API_ROOT}${url}`, body).catch(error => {
            handleStatus(error.response.status);
            throw error;
        })
};

const Auth = {
    login: (email, password) => requests.post('/login', { email, password }),
    logout: () => requests.post('/logout')
};
const User = {
    me: () => requests.get('/me'),
    get: body => requests.get('/user', body),
    getOne: id => requests.get(`/user/${id}`),
    getAll: () => requests.get('/user/all'),
    update: (id, body) => requests.put(`/user/${id}`, body),
    updateSocialNetwork: (id, body) => requests.patch(`/user/${id}`, body),
    invite: body => requests.post('/invite', body),
    delete: body => requests.del(`/user`, body),
    addLanguage: (id, body) => requests.patch(`/user/${id}/language`, body),
    updateLanguage: (id, body) => requests.patch(`/user/language/${id}`, body),
    deleteLanguage: id => requests.del(`/user/language/${id}`),
    addSkill: (id, body) => requests.patch(`/user/${id}/skill`, body),
    updateSkill: (id, body) => requests.patch(`/user/skill/${id}`, body),
    deleteSkill: id => requests.del(`/user/skill/${id}`),
    changeImage: (id, body) => requests.patch(`/user/${id}/image`, body),
    addComment: (id, body) => requests.post(`/user/${id}/comment`, body)
};
const Enum = {
    get: body => requests.get(`/get/enum`, { params: body })
};
const Office = {
    get: body => axios.get(`/${API_ROOT}/office`, { params: body }),
    delete: id => requests.del(`/office/${id}`),
    getOne: id => requests.get(`/office/${id}`),
    update: (id, body) => requests.put(`/office/${id}`, body),
    updateFields: (id, body) => requests.patch(`/office/${id}`, body),
    create: body => requests.post('/office', body)
};
const Role = {
    get: body => axios.get(`/${API_ROOT}/roles`, { params: body })
};
const Customer = {
    add: data => requests.post('/customer', data),
    get: body => requests.get('/customer', body),
    getAll: () => requests.get('/customer/all'),
    getDetail: id => requests.get(`/customer/${id}/detail`),
    addComment: (id, body) => requests.post(`/customer/${id}/comment`, body),
    merge: data => requests.post('/customer/merge', data),
    update: (id, body) => requests.put(`/customer/${id}`, body),
    delete: id => requests.del(`/customer/${id}`),
    deleteMany: body => requests.del('/customer', body),
    addBankDetail: (id, body) => requests.post(`/customer/${id}/detail`, body)
};

const Autocomplete = {
    get: (url, body) => requests.get(`${url}`, body)
};
const Currency = {
    get: () => requests.get('/currency'),
    update: (id, body) => requests.patch(`/currency/${id}`, body)
};
const Dashboard = {
    getChart: body => requests.get('/dashboard/chart', body),
    getFinanceInfo: body => requests.get('/dashboard', body)
};
const Transaction = {
    getTransactions: body => requests.get('/transaction', body),
    update: (id, body) => requests.patch(`/transaction/${id}`, body),
    getOne: id => requests.get(`/transaction/${id}`),
    getNew: () => requests.get('/transaction/new'),
    getContractors: body => requests.get('/transaction/contractors', body),
    getProjects: body => requests.get('/transaction/projects', body),
    getType: () => requests.get('/get/enum?types[]=transaction_type'),
    create: body => requests.post('/transaction', body),
    updateStatus: (id, body) =>
        requests.patch(`/transaction/${id}/status`, body),
    delete: body => requests.del(`/transaction`, body),
    addComment: (id, body) =>
        requests.post(`/transaction/${id}/comment`, body)
};
const AccountItem = {
    get: body => requests.get('/account-item', body),
    add: body => requests.post('/account-item', body),
    getOne: id => requests.get(`/account-item/${id}`),
    update: (id, body) => requests.patch(`/account-item/${id}`, body),
    delete: body => requests.del(`/account-item`, body),
    getItems: body => requests.get('/account-item/get-items', body),
    colors: () => requests.get('/account-item/get/colors'),
    getAdditionalStuff: () => requests.get('/account-item/new')
};
const Account = {
    update: (id, body) => requests.patch(`/account/${id}`, body),
    delete: id => requests.del(`/account/${id}`),
    createAccount: (id, body) => requests.post(`/office/${id}/account`, body),
    updateAmount: (id, body) => requests.patch(`/account/${id}/amount`, body)
};
const Vacancies = {
    getAll: body => requests.get('/vacancy', body),
    getOne: id => requests.get(`/vacancy/${id}`),
    add: body => requests.post('/vacancy', body),
    edit: (id, body) => requests.put(`/vacancy/${id}`, body),
    delete: id => requests.del(`/vacancy/${id}`),
    deleteMany: body => requests.del('/vacancy', body)
};

const Cities = {
    getAll: () => requests.get('/city/all')
};
const Project = {
    getProject: id => requests.get(`/project/${id}`),
    addProject: body => requests.post('/project', body),
    deleteProject: id => requests.del(`/project/${id}`),
    editProject: (id, body) => requests.put(`/project/${id}`, body),
    getDetail: id => requests.get(`/project/${id}/detail`),
    addComment: (id, body) => requests.post(`/project/${id}/comment`, body)
};

const Language = {
    updateLanguage: (id, body) => requests.patch(`/language/${id}`, body),
    deleteLanguage: id => requests.del(`/language/${id}`)
};

const Skill = {
    updateSkill: (id, body) => requests.patch(`/skill/${id}`, body),
    deleteSkill: id => requests.del(`/skill/${id}`)
};

const Hostings = {
    get: body => requests.get('/hosting', body),
    delete: (body) => requests.del('/hosting', body),
    create: body => requests.post('/hosting', body),
    getOne: id => requests.get(`/hosting/${id}`),
    update: (id, body) => requests.put(`/hosting/${id}`, body),
    addComment: (id, body) => requests.post(`/hosting/${id}/comment`, body),
    getComments: id => requests.get(`/hosting/${id}/comments`),
    getStatistics: () => requests.get('/hosting/statistics'),
    extendTariff: id => requests.patch(`/hosting/${id}/tariff`),
    changeTariff: body => requests.patch('/hosting/change/tariff', body),
    changeServer: body => requests.patch('/hosting/change/server', body),
    updateAccesses: (id, body) => requests.patch(`/hosting/${id}`, body),
    getSelected: body => requests.get('/hosting/get-selected', body),
    sendNotifyDebtor: () => requests.get('/hosting/send-notify-debtor')
};

const Servers = {
    getAll: body => requests.get('/server/all', body),
    get: () => requests.get('/server'),
    getOne: id => requests.get(`/server/${id}`),
    create: body => requests.post('/server', body),
    edit: (id, body) => requests.put(`/server/${id}`, body),
    delete: (id, body) => requests.del(`/server/${id}`, body)
};

const Comments = {
    delete: id => requests.del(`/comment/${id}`),
    edit: (id, body) => requests.patch(`/comment/${id}`, body)
};

const BankDetail = {
    edit: (id, body) => requests.patch(`/bank-detail/${id}`, body)
};

export default {
    Auth,
    User,
    Customer,
    Enum,
    Office,
    Role,
    Autocomplete,
    Currency,
    Dashboard,
    Transaction,
    AccountItem,
    Account,
    Vacancies,
    Cities,
    Project,
    Language,
    Skill,
    Hostings,
    Servers,
    Comments,
    BankDetail
};
