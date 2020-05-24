import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingIndicator } from '../../shared/LoadingIndicator/LoadingIndicator';
import { Error } from '../../shared/Error/Error';
import { fetchProducts } from '../../state/actions/productsAction';
import ProductCardGrid from './Components/ProductCardGrid';

class ShopPage extends Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {

        const { loading, failed, productsLoaded, menu} = this.props;
        let body = null;

        if (loading) {
            body = <LoadingIndicator busy={loading} />;
        }

        if (failed) {
            body = <Error message="Failed to fetch list of zip codes" />;
        }

        if (productsLoaded) {
            body = <ProductCardGrid products={menu} />;
        }

        return (
            <div>
                {body}
            </div>
        );
    }
}

ShopPage.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    failed: PropTypes.bool,
    productsLoaded: PropTypes.bool,
    meta: PropTypes.object,
    menu: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    const { loading, failed, menu, links, productsLoaded, meta } = state.products;
    return { loading, failed, productsLoaded, menu, meta, links };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        fetchProducts
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
