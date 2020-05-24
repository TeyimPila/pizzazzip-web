import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => (
    <div className={`alert alert-${props.severity} p-5 m-5`} role="alert">
        <i className="fas fa-exclamation-circle fa-2x"/>
        <span className="h4 ml-3 alert-heading">{props.title}</span>
        <p className="ml-5 mt-3">{props.message}</p>
    </div>
);

Error.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string
};

Error.defaultProps = {
    title: 'Unexpected Application Error',
    message: 'App Crashed',
    severity: 'danger'
};

export { Error };
