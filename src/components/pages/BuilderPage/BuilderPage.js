// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchZipCodes } from '../../state/actions/ZipCodeActions';
// import { ZipCodeList } from './Components/ZipCodeList';
import { LoadingIndicator } from '../../shared/LoadingIndicator/LoadingIndicator';
import { Error } from '../../shared/Error/Error';
import { fetchProduct } from '../../state/actions/productsAction';

// import zipCodes from '../../state/services/zips.json';

class BuilderPage extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchProduct(id);
    }

    render() {

        const { loading, failed, productLoaded, product } = this.props;

        console.log('The paroduc', product)
        console.log('The loaded', productLoaded)

        if (loading) {
            return <LoadingIndicator busy={loading} />;
        }

        if (failed) {
            return <Error message="Failed to fetch list of zip codes" />;
        }


        return (
            <div>
                Hello world
            </div>
        );
    }
}

BuilderPage.propTypes = {
    fetchProduct: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    failed: PropTypes.bool,
    productLoaded: PropTypes.bool,
    product: PropTypes.object.isRequired,
    match: PropTypes.object,
};


// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    const { loading, failed, product, productLoaded } = state.products;

    return { loading, failed, productLoaded, product };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        fetchProduct
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BuilderPage);

