import axios from 'axios';

export const baseUrl = 'http://127.0.0.1:8000/api';

const composeData = (method, body) =>
    (method === 'post' || method === 'put' ? { data: body } : {});

/**
 * Returns a promise for an HTTP request
 * @async
 * @param {string} url - HTTP resource enpoint
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
