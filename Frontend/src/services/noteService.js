import axios from 'axios';

import { BASE_URL } from '../config';
import { getJwt, setTokenHeader } from '../services/authService';

const apiEndpoint = `${BASE_URL}/notes`;

setTokenHeader(getJwt());

export async function getNotes() {
    const res = await axios.get(`${apiEndpoint}/getNotes`);
    return res.data;
}

export async function editNote(data) {
    const res = await axios.put(`${apiEndpoint}/editNote`, data);
    return res.data;
}

export async function addNote(data) {
    const res = await axios.post(`${apiEndpoint}/newNote`, data);
    return res.data;
}

export async function deleteNote(data) {
    const res = await axios.delete(`${apiEndpoint}/deleteNote`, {
        data: { id: data._id }
    });
    return res.data;
}

export default {
    getNotes,
    editNote,
    addNote,
    deleteNote
};
