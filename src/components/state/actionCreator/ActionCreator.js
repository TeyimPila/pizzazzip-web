import apiCall from '../services/apiCall';

/**
 * Constructs async actions constants
 * @param baseName {string}
 * @returns {Object}
 */
export const asyncActionNames = (baseName) => ({
    failure: `${baseName}_FAILURE`,
    loading: `${baseName}_LOADING`,
    success: `${baseName}_SUCCESS`,
});

/**
 * Constructs Redux async actions
 * @param {string} actionName
 * @returns {Object}
 */
export const asyncActions = (
    actionName,
) => ({
    loading: (bool) => ({
        type: asyncActionNames(actionName).loading,
        payload: bool,
    }),
    failure: (bool, error) => ({
        type: asyncActionNames(actionName).failure,
        payload: { error, status },
    }),
    success: (payload) => ({
        type: asyncActionNames(actionName).success,
        payload,
    }),
});

/**
 * Dispatches Redux Actions
 * @returns {function(*): Promise<any>} - Function that dispatches Redux Actions
 * @param actionName {string}
 * @param url {string}
 * @param method {string}
 * @param body {Object}
 * @param token {string}
 */
export const asyncRequest = (actionName, url, method, body = null, token = '') => (dispatch) => {
    console.log('lasdfg', body);
    dispatch(asyncActions(actionName).loading(true));
    return apiCall(url, method, body, token)
        .then((res) => {
            dispatch(asyncActions(actionName).success(res.data));
            return res;
        })
        .catch((err) => {
            if (err && err.response) {
                dispatch(asyncActions(actionName).failure(true, err.response.data));
            }
        });
};
