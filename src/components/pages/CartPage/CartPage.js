// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCartItem, emptyCart } from '../../state/actions/cartActions';
import { submitOrder } from '../../state/actions/orderActions';
import { Button, Divider, Form, Grid, Header, Image, Table } from 'semantic-ui-react';
import { remove, set } from 'lodash';
import { bindActionCreators } from 'redux';

class CartPage extends Component {

    constructor(props) {
        super(props);

        const { cart } = this.props;
        this.state = {
            cart,
            userDetails: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            deliveryAddress: {
                addressLine1: '',
                addressLine2: '',
                zipCode: '',
            },
            orderNote: '',
        };
    }

    cartEmptyHandler = () => {
        this.props.emptyCart();
        this.setState({ cart: { orderItems: [] } });
        this.props.history.replace('/shop');
    }

    formFieldChangeHandler = (e, { name, value }) => {
        const state = Object.assign({}, this.state);
        this.setState({ ...set(state, name, value) });
    }

    itemDeleteHandler = (uuid) => {
        const cart = Object.assign({}, this.state.cart);
        remove(cart.orderItems, { uuid });

        this.setState({ cart });
        this.props.deleteCartItem(uuid);
    }

    orderSubmitHandler = () => {
        const { cart, userDetails, deliveryAddress, orderNote } = this.state;
        this.props.submitOrder({ ...cart, userDetails, deliveryAddress, orderNote });

        // this.props.emptyCart();
    }

    //TODO: Move to own component
    renderOrderItem = ({ orderItem, onDelete }) => {
        const { name, orderItemTotal, quantity, uuid, toppings } = orderItem;

        return (
            <Table.Row key={uuid}>
                <Table.Cell>
                    <Button.Group>
                        <Button onClick={() => onDelete(uuid)} basic>x</Button>
                    </Button.Group>
                    <Image avatar src="https://via.placeholder.com/60.png" />
                </Table.Cell>
                <Table.Cell>
                    <Header as={'h4'}>{name}</Header>
                    <div>{toppings.length > 0 && `With: ${toppings.map(({ quantity, name }) => `${quantity}x ${name}`).join(', ')}`}</div>
                </Table.Cell>
                <Table.Cell>
                    {quantity || 0}
                </Table.Cell>
                <Table.Cell>{orderItemTotal}</Table.Cell>
            </Table.Row>
        );
    }

    render() {

        const {
            cart: { orderItems },
            userDetails: { last_name, email, phone, first_ame },
            deliveryAddress: { addressLine1, addressLine2, zipCode },
            orderNote
        } = this.state;

        const cartTotal = orderItems.reduce((total, orderItem) => total + (orderItem.orderItemTotal), 0);
        const shipping = .05 * cartTotal;

        const cartIsEmpty = orderItems.length === 0;

        console.log('The state', this.state);
        return (
            <Grid columns={2} stackable centered>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid centered>
                            <Grid.Row centered>
                                <Header as={'h1'}>Your Food Basket</Header>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Table unstackable className="ui very basic table" padded="very" collapsing>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell />
                                            <Table.HeaderCell>Food Item</Table.HeaderCell>
                                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                                            <Table.HeaderCell>Subtotal</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {orderItems.map((orderItem) => this.renderOrderItem(
                                            {
                                                orderItem,
                                                onDelete: this.itemDeleteHandler,
                                            })
                                        )}
                                        <Table.Row>
                                            <Table.Cell />
                                            <Table.Cell />
                                            <Table.Cell>Delivery Cost</Table.Cell>
                                            <Table.Cell>{shipping}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell />
                                            <Table.Cell>
                                                <Button color={'red'} basic onClick={() => this.cartEmptyHandler()}>Empty
                                                    Basket</Button>
                                            </Table.Cell>
                                            <Table.Cell>Total</Table.Cell>
                                            <Table.Cell>{cartTotal + shipping}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid centered>
                            <Grid.Row centered>
                                <Header as={'h1'}>Checkout Details</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header>Contact Details</Header>
                                    <Divider style={{ width: '15%' }} />
                                    <Form>
                                        <Form.Group widths="equal">
                                            <Form.Input
                                                required
                                                label="First name"
                                                placeholder="First name"
                                                name="userDetails.first_ame"
                                                value={first_ame}
                                                onChange={this.formFieldChangeHandler}
                                            />
                                            <Form.Input
                                                required
                                                label="Last name"
                                                placeholder="Last name"
                                                name="userDetails.last_name"
                                                value={last_name}
                                                onChange={this.formFieldChangeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                            <Form.Input
                                                required
                                                label="Email"
                                                placeholder="john.doe@email.com"
                                                type="email"
                                                name="userDetails.email"
                                                value={email}
                                                onChange={this.formFieldChangeHandler}
                                            />
                                            <Form.Input
                                                required
                                                label="Phone"
                                                placeholder="+xxx xxxx xxxx"
                                                name="userDetails.phone"
                                                value={phone}
                                                onChange={this.formFieldChangeHandler}
                                            />
                                        </Form.Group>

                                        <Header>Delivery Details</Header>
                                        <Divider style={{ width: '15%' }} />
                                        <Form.Group widths="equal">
                                            <Form.Input
                                                required
                                                label="Address Line 1"
                                                placeholder="Street + House Number"
                                                name="deliveryAddress.addressLine1"
                                                value={addressLine1}
                                                onChange={this.formFieldChangeHandler}
                                            />
                                            <Form.Input
                                                required
                                                label="Address Line 2"
                                                placeholder="Address Line 2"
                                                name="deliveryAddress.addressLine2"
                                                value={addressLine2}
                                                onChange={this.formFieldChangeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Input
                                            required
                                            label="Zip Code"
                                            placeholder="Zip Code"
                                            name="deliveryAddress.zipCode"
                                            value={zipCode}
                                            onChange={this.formFieldChangeHandler}
                                        />

                                        <Form.TextArea
                                            label="Order Note"
                                            placeholder="E.g. Call ring the bell when you get here"
                                            name="orderNote"
                                            value={orderNote}
                                            onChange={this.formFieldChangeHandler}
                                        />

                                        <Form.Button
                                            disabled={cartIsEmpty}
                                            color={'green'}
                                            onClick={this.orderSubmitHandler}
                                            basic
                                            content="Place Order" />
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

CartPage.propTypes = {
    cart: PropTypes.object.isRequired,
    emptyCart: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
    deleteCartItem: PropTypes.func.isRequired,
    submitOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { cart } = state;
    return { cart };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        emptyCart,
        deleteCartItem,
        submitOrder,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

