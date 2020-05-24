import axios from 'axios';

// This is 'hacky'. I couldn't get webpack to set environment variables.
const currentHost = window.location.hostname;
export const baseUrl = currentHost === '127.0.0.1' || currentHost ===  'localhost' ? 'http://127.0.0.1:8000/api' : 'https://pizzazzip-api.herokuapp.com/api';

const composeData = (method, body) =>
    (method === 'post' || method === 'put' ? { data: body } : {});

/**
 * Returns a promise for an HTTP request
 * @async
 * @param {string} url - HTTP resource endpoint
 * @param {string} method - HTTP verbs
 * @param {Object} body - HTTP request body
 * @param {string} token - Authentication token
 * @returns {Promise} - Promise object of HTTP request
 */
const apiCall = (url, method, body, token = '') => {
    const requestUrl = `${baseUrl}/${url}${token}`;
    return axios({
        method,
        url: requestUrl,
        ...composeData(method, body),
    });
};

export default apiCall;
