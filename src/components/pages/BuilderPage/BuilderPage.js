import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingIndicator } from '../../shared/LoadingIndicator/LoadingIndicator';
import { Error } from '../../shared/Error/Error';
import { fetchProducts } from '../../state/actions/productsAction';
import { addToCart } from '../../state/actions/cartActions';
import { Button, Divider, Grid, Header, Image, List } from 'semantic-ui-react';
import { find, isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ToppingListItem from './Components/ToppingListItem';

class BuilderPage extends Component {

    constructor(props) {
        super(props);

        const { selectedProduct } = this.props;
        this.state = {
            orderItem: {
                ...selectedProduct,
                quantity: 1,
            },
            toppings: [],
            totalPrice: selectedProduct.unitPrice
        };
    }

    componentDidMount() {
        const { toppings, selectedProduct: { type } } = this.props;

        if (type === 'pizza') {
            this.props.fetchProducts();
        }

        this.setState({ toppings });
    }

    /**
     * Handles the addition of new items to cart.
     */
    addToCardHandler = () => {
        const { toppings, orderItem, totalPrice } = this.state;
        const addedToppings = toppings.filter(({ quantity }) => quantity >= 1);
        const fullOrderItem = { ...orderItem, toppings: addedToppings, orderItemTotal: totalPrice, uuid: uuidv4() };
        this.props.addToCart(fullOrderItem);
        this.props.history.go(0);
    }

    viewCart = () => {
        this.props.history.replace('/cart');
    }

    /**
     * Handles changes to the quantity of toppings
     * @param id
     * @param unitPrice: unit price of item
     * @param offSet: -1 or 1, referring to increase or decrease
     */
    toppingQuantityChangeHandler = ({ id, unitPrice }, offSet) => {
        const toppings = Object.assign([], this.state.toppings);
        const topping = find(toppings, { id });
        topping.quantity = topping.quantity !== undefined ? topping.quantity + offSet : offSet;

        this.setState((prevState) => ({
            ...prevState,
            toppings,
            totalPrice: prevState.totalPrice + (unitPrice * prevState.orderItem.quantity * offSet)
        }));
    }

    /**
     * Adjusts the quantity of current order Item.
     * @param offSet: -1 oor 1, referring to increase or decrease
     */
    overallQuantityChangeHandler = (offSet) => {

        this.setState((prevState) => ({
            ...prevState,
            orderItem: {
                ...prevState.orderItem,
                quantity: prevState.orderItem.quantity + offSet,
            },
            totalPrice: prevState.totalPrice + (prevState.totalPrice * (offSet / prevState.orderItem.quantity))
        }));
    }


    render() {

        const { loading, failed, selectedProduct } = this.props;

        if (loading) {
            return <LoadingIndicator busy={loading} />;
        }

        if (failed) {
            return <Error message="Failed to fetch list of zip codes" />;
        }

        const { description, ingredients, name, unitPrice, id, type } = selectedProduct;
        const { orderItem: { quantity }, toppings, totalPrice } = this.state;

        return (
            <Grid columns={2} stackable centered>
                <Grid.Row centered>
                    <Grid.Column>
                        <Image src={'https://via.placeholder.com/550.png'} alt={name} />
                        <span className="date">{description}</span>
                        {!isEmpty(ingredients) > 0 && (
                            <span style={{ color: 'gray' }}>
                                    Contains: {ingredients.map(ingredient => ingredient.name).join(', ')}
                            </span>
                        )}
                        <Header>{name} ($2.35)</Header>
                    </Grid.Column>
                    <Grid.Column style={{ height: '100%', position: 'relative' }}>
                        <Grid.Row>
                            <Grid.Column width={11}>
                                <Header as={'h2'}>
                                    {type === 'pizza' ? 'Add extra topping' : 'How many drinks? Don\'t be shy'}
                                </Header>
                            </Grid.Column>
                            <Grid.Column floated={'right'} width={3}>
                                <Button
                                    onClick={() => this.viewCart()}
                                    color="green" size="small"
                                    style={{ width: '100%' }}
                                    basic
                                >
                                    Cart <i className={'fa fa-external-link-alt'} />
                                </Button>
                            </Grid.Column>

                        </Grid.Row>

                        <Divider style={{ width: '95%' }} />

                        <List verticalAlign="middle">
                            <List.Item key={id}>
                                <Image avatar src="https://via.placeholder.com/50.png" />
                                <List.Content>{name} (${unitPrice})</List.Content>
                                <Button disabled size="large" floated="right">{quantity}</Button>
                            </List.Item>
                            {type === 'pizza' && toppings.map((topping) =>
                                <ToppingListItem
                                    key={topping.id}
                                    topping={topping}
                                    onAdd={this.toppingQuantityChangeHandler}
                                    onSubtract={this.toppingQuantityChangeHandler}
                                />
                            )}
                        </List>

                        <Grid columns={2} style={{ marginTop: 100 }} stackable>
                            <Grid.Column width={2} floated="left">
                                <Button.Group style={{ width: '100%' }}>
                                    <Button
                                        disabled={quantity <= 1}
                                        icon="minus" size="small" basic color="red"
                                        onClick={() => this.overallQuantityChangeHandler(-1)} />
                                    <Button disabled basic size="small">{quantity}</Button>
                                    <Button
                                        icon="plus" size="large" basic color="green"
                                        onClick={() => this.overallQuantityChangeHandler(1)} />
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
    history: PropTypes.any,
    selectedProduct: PropTypes.object,
};

const mapStateToProps = state => {
    console.log('The cart', state.cart);
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

