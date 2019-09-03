import axios from 'axios'

export const login = (params) => {
    return axios.post('/user/login', params);
}

export const signup = (params) => {
    return axios.post('/user/signup', params);
}

export const getContacts = (params) => {
    return axios.post('/user/contacts', params);
}