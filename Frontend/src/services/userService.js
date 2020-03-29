import axios from 'axios';

import { BASE_URL } from '../config';
import { setTokenHeader, getJwt } from './authService';

const apiEndpoint = `${BASE_URL}/users/register`;

export async function register(email, password) {
    const res = await axios.post(apiEndpoint, { email, password });
    localStorage.setItem('token', res.data.token);
    setTokenHeader(getJwt());
    return res.data;
}
