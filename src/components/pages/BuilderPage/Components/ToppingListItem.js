import { Button, Image, List } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const ToppingListItem = ({ topping, onAdd, onSubtract }) => {

    return (
        <List.Item key={topping.id}>
            <Image avatar src='https://via.placeholder.com/50.png' />
            <List.Content>{topping.name} (${topping.unitPrice})</List.Content>
            <List.Content floated='right'>
                <Button.Group>
                    <Button
                        icon='minus' disabled={!topping.quantity} onClick={() => onSubtract(topping, -1)} basic
                        color='red' />
                    <Button disabled basic size={'small'}>{topping.quantity || 0}</Button>
                    <Button icon='plus' onClick={() => onAdd(topping, 1)} basic color='green' />
                </Button.Group>
            </List.Content>
        </List.Item>
    );
};

ToppingListItem.propTypes = {
    topping: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onSubtract: PropTypes.func.isRequired,
};

export default ToppingListItem;
