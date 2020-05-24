import { Button, Header, Image, Table } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const OrderItem = ({ orderItem, onDelete }) => {
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
};

OrderItem.propTypes = {
    orderItem: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default OrderItem;
