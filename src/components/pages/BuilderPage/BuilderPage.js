// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchZipCodes } from '../../state/actions/ZipCodeActions';
// import { ZipCodeList } from './Components/ZipCodeList';
import { LoadingIndicator } from '../../shared/LoadingIndicator/LoadingIndicator';
import { Error } from '../../shared/Error/Error';
import { fetchProducts } from '../../state/actions/productsAction';
import { addToCart } from '../../state/actions/cartActions';
import { Button, Divider, Grid, Header, Image, List } from "semantic-ui-react";
import { find } from 'lodash'

class BuilderPage extends Component {

    constructor(props) {
        super(props);

        const { selectedProduct } = this.props;
        this.state = {
            orderItem: {
                ...selectedProduct,
                extraToppings: [],
                quantity: 1,
            },
            toppings: [],
            totalPrice: selectedProduct.unitPrice
        }
    }

    componentDidMount() {
        const { toppings, selectedProduct: { type } } = this.props;
        if (type === 'pizza') {
            this.props.fetchProducts();
        }

        this.setState({ toppings })
    }

    addToCardHandler = () => {
        this.props.addToCart(this.state.orderItem);
    }

    toppingAddHandler = ({ id, unitPrice }, offSet) => {
        const toppings = Object.assign([], this.state.toppings);
        const topping = find(toppings, { id })
        topping.quantity = topping.quantity !== undefined ? topping.quantity + offSet : offSet

        this.setState((prevState) => ({
            ...prevState,
            toppings,
            totalPrice: prevState.totalPrice + (unitPrice * prevState.orderItem.quantity * offSet)
        }))
    }

    handleOverallQuantity = (offSet) => {

        this.setState((prevState) => ({
            ...prevState,
            orderItem: {
                ...prevState.orderItem,
                quantity: prevState.orderItem.quantity + offSet,
            },
            totalPrice: prevState.totalPrice + (prevState.totalPrice * (offSet / prevState.orderItem.quantity))
        }))
    }

    //TODO: Move to own component
    renderTopping = ({ topping, onAdd, onSubtract }) => {

        return (
            <List.Item key={topping.id}>
                <Image avatar src="https://via.placeholder.com/50.png" />
                <List.Content>{topping.name} (${topping.unitPrice})</List.Content>
                {/*<List.Content>{topping.times || 0}</List.Content>*/}
                <List.Content floated="right">
                    <Button.Group>
                        <Button
                            icon="minus" disabled={!topping.quantity} onClick={() => onSubtract(topping, -1)} basic
                            color="red" />
                        <Button disabled>{topping.quantity || 0}</Button>
                        <Button icon="plus" onClick={() => onAdd(topping, 1)} basic color="green" />
                    </Button.Group>

                </List.Content>
            </List.Item>
        )
    }

    render() {

        const { loading, failed, productLoaded, selectedProduct } = this.props;

        console.log('The product', selectedProduct)
        console.log('The loaded', productLoaded)

        if (loading) {
            return <LoadingIndicator busy={loading} />;
        }

        if (failed) {
            return <Error message="Failed to fetch list of zip codes" />;
        }

        const { description, ingredients, name, unitPrice, id } = selectedProduct;
        const { orderItem: { quantity }, toppings, totalPrice } = this.state;

        return (
            <Grid columns={2} stackable centered>
                <Grid.Row centered>
                    <Grid.Column>
                        <Image src={'https://via.placeholder.com/720.png'} alt={name} />
                        <span className="date">{description}</span>
                        {ingredients.length > 0 && (
                            <span style={{ color: 'gray' }}>
                                    Contains: {ingredients.map(ingredient => ingredient.name).join(', ')}
                            </span>
                        )}
                        <Header>{name} ($2.35)</Header>
                    </Grid.Column>
                    <Grid.Column style={{ height: '100%', position: 'relative' }}>
                        <Header as={'h2'}>Add extra topping</Header>
                        <Divider style={{ width: '95%' }} />

                        <List verticalAlign="middle">
                            <List.Item key={id}>
                                <Image avatar src="https://via.placeholder.com/50.png" />
                                <List.Content>{name} (${unitPrice})</List.Content>
                                <Button disabled size="large" floated="right">{quantity}</Button>
                            </List.Item>
                            {toppings.map((topping) => this.renderTopping(
                                {
                                    topping,
                                    onAdd: this.toppingAddHandler,
                                    onSubtract: this.toppingAddHandler
                                })
                            )}
                        </List>

                        <Grid columns={2} style={{ left: 15, right: 15, position: 'absolute', bottom: 0 }} stackable>
                            <Grid.Column width={2} floated="left">
                                <Button.Group style={{ width: '100%' }}>
                                    <Button
                                        disabled={quantity <= 1}
                                        icon="minus" size="large" basic color="red"
                                        onClick={() => this.handleOverallQuantity(-1)} />
                                    <Button disabled size="large">{quantity}</Button>
                                    <Button
                                        icon="plus" size="large" basic color="green"
                                        onClick={() => this.handleOverallQuantity(1)} />
                                </Button.Group>
                            </Grid.Column>
                            <Grid.Column width={11} floated="right">
                                <Button
                                    onClick={() => this.addToCardHandler()}
                                    color="green" size="large"
                                    style={{ width: '100%' }}
                                >
                                    ${totalPrice}
                                    <i className={'fa fa-cart-plus'} />
                                </Button>
                            </Grid.Column>
                        </Grid>

                        {/*</Segment>*/}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

BuilderPage.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    failed: PropTypes.bool,
    productLoaded: PropTypes.bool,
    toppings: PropTypes.array.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
    selectedProduct: PropTypes.object,
};


const mapStateToProps = state => {
    console.log('The cart', state.cart)
    const { loading, failed, toppings, selectedProduct, productLoaded } = state.products;
    return { loading, failed, productLoaded, toppings, selectedProduct };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        fetchProducts,
        addToCart
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(BuilderPage);

