// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { fetchZipCodes } from '../../state/actions/ZipCodeActions';
// import { ZipCodeList } from './Components/ZipCodeList';
import { Button, Grid, Header, Image, Table } from "semantic-ui-react";

class CartPage extends Component {

    constructor(props) {
        super(props);

        const { cart } = this.props;
        this.state = { cart }
    }

    // addToCardHandler = () => {
    //     this.props.addToCart(this.state.orderItem);
    // }
    //
    // toppingAddHandler = ({ id, unitPrice }, offSet) => {
    //     const toppings = Object.assign([], this.state.toppings);
    //     const topping = find(toppings, { id })
    //     topping.quantity = topping.quantity !== undefined ? topping.quantity + offSet : offSet
    //
    //     this.setState((prevState) => ({
    //         ...prevState,
    //         toppings,
    //         totalPrice: prevState.totalPrice + (unitPrice * prevState.orderItem.quantity * offSet)
    //     }))
    // }

    //TODO: Move to own component
    renderOrderItem = ({ orderItem, onAdd, onSubtract }) => {
        const { id, name, unitPrice, quantity } = orderItem;

        return (
            <Table.Row key={id} textAlign="center">
                {/*<Table.Cell ><Button basic>x</Button></Table.Cell>*/}
                <Table.Cell>
                    <Button basic className={'no-border'}>x</Button>
                    <Image avatar src="https://via.placeholder.com/50.png" />
                </Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{unitPrice}</Table.Cell>
                <Table.Cell>
                    <Button.Group>
                        <Button
                            disabled={quantity <= 1} onClick={() => onSubtract(orderItem, -1)} basic
                        >-</Button>
                        <Button disabled>{quantity || 0}</Button>
                        <Button onClick={() => onAdd(orderItem, 1)} basic>+</Button>
                    </Button.Group>
                </Table.Cell>
                <Table.Cell>{unitPrice * quantity}</Table.Cell>
            </Table.Row>

        )
    }

    render() {

        const { cart: { orderItems } } = this.state;

        return (
            <Grid columns={2} stackable centered>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid>
                            <Grid.Row centered>
                                <Header as={'h1'}>Your Food Basket</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Table unstackable className="ui very basic table" padded="very">
                                    <Table.Header>
                                        <Table.Row textAlign="center">
                                            <Table.HeaderCell />
                                            <Table.HeaderCell>Food Item</Table.HeaderCell>
                                            <Table.HeaderCell>Unit Price</Table.HeaderCell>
                                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                                            <Table.HeaderCell>Subtotal</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {orderItems.map((orderItem) => this.renderOrderItem(
                                            {
                                                orderItem,
                                                onAdd: this.toppingAddHandler,
                                                onSubtract: this.toppingAddHandler
                                            })
                                        )}
                                        <Table.Row textAlign="center">

                                            <Table.Cell />
                                            <Table.Cell />
                                            <Table.Cell />
                                            <Table.Cell>Shipping</Table.Cell>
                                            <Table.Cell>200</Table.Cell>
                                        </Table.Row>
                                        <Table.Row textAlign="center">
                                            <Table.Cell />
                                            <Table.Cell>
                                                <Button color={'red'} basic>Empty Basket</Button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button color={'green'} basic>Proceed to Checkout</Button>
                                            </Table.Cell>
                                            <Table.Cell>Total</Table.Cell>
                                            <Table.Cell>200</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
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
};


const mapStateToProps = state => {
    const { cart } = state;
    return { cart };
};

// const mapDispatchToProps = dispatch => (
//     bindActionCreators({
//         fetchProducts,
//         addToCart
//     }, dispatch)
// );

export default connect(mapStateToProps, null)(CartPage);

