import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingIndicator } from '../../shared/LoadingIndicator/LoadingIndicator';
import { Error } from '../../shared/Error/Error';
import { fetchProducts } from '../../state/actions/productsAction';
import ProductCardGrid from './Components/ProductCardGrid';
import { filter, isEmpty } from 'lodash';
import { Dropdown, Input } from 'semantic-ui-react';

const friendOptions = [
    {
        key: 'all',
        text: 'All',
        value: 'all',
    },
    {
        key: 'drinks',
        text: 'Drinks',
        value: 'drink',
    },
    {
        key: 'pizzas',
        text: 'Pizzas',
        value: 'pizza',
    },
];

class ShopPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'all',
            searchTerm: '',
            visibleItems: []
        };
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.setState({ visibleItems: this.props.menu });
    }

    /**
     * Filter the items that should be displayed
     * @param filterOption
     * @param searchTerm
     * @returns {Array}
     */
    filterMenu = (filterOption, searchTerm) => {

        if (filterOption !== 'all' && isEmpty(searchTerm)) {
            console.log('Not all, empty');
            return filter(this.props.menu, obj => (obj.type === filterOption));
        }

        if (filterOption === 'all' && isEmpty(searchTerm)) {
            return this.props.menu;
        }

        if (filterOption === 'all' && !isEmpty(searchTerm)) {
            return filter(this.props.menu, obj => (obj.name.toLowerCase().includes(searchTerm.toLowerCase())));
        }

        return filter(this.props.menu, obj => (
            obj.type === filterOption && obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    filterChangeHandler = (_, { value }) => {
        const visibleItems = this.filterMenu(value, this.state.searchTerm);

        this.setState((prevState) => ({
            ...prevState, visibleItems, filter: value,
        }));
    }

    searchChangeHandler = (_, { value }) => {
        const visibleItems = this.filterMenu(this.state.filter, value);
        this.setState((prevState) => ({
            ...prevState, visibleItems, searchTerm: value
        }));
    }

    render() {

        const { loading, failed, productsLoaded, menu } = this.props;
        let body = null;

        if (loading) {
            body = <LoadingIndicator busy={loading} />;
        }

        if (failed) {
            body = <Error message="Failed to fetch list of zip codes" />;
        }

        if (productsLoaded && isEmpty(menu)) {
            body = <Error severity="warning" title="Still to list our pizzas" message="The menu is empty" />;
        }

        const { searchTerm, visibleItems } = this.state;

        if (productsLoaded) {
            body = <ProductCardGrid products={visibleItems} />;
        }

        return (
            <div>
                <div style={{ margin: '20px 0 20px 0' }}>
                    <Dropdown
                        placeholder="Filter"
                        onChange={this.filterChangeHandler}
                        selection
                        options={friendOptions}
                    />
                    {' '}
                    <Input
                        placeholder="Search our menu..."
                        value={searchTerm}
                        onChange={this.searchChangeHandler}
                    />
                </div>
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
