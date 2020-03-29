import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { BASE_URL } from '../config';

const apiEndpoint = `${BASE_URL}/users/login`;

export const login = async (email, password) => {
    const res = await axios.post(apiEndpoint, { email, password });
    localStorage.setItem('token', res.data.token);
    setTokenHeader(getJwt());
    return res.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    setTokenHeader(false);
};

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token).id;
        return user;
    } catch (ex) {
        return null;
    }
};

export const getJwt = () => {
    return localStorage.getItem('token');
};

export const setTokenHeader = token => {
    if (token) {
        axios.defaults.headers.common['authorization'] = token;
    } else {
        delete axios.defaults.headers['authorization'];
    }
};

export default {
    login,
    logout,
    getCurrentUser,
    getJwt,
    setTokenHeader
};
