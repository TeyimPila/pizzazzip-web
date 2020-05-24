import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const ProductCard = ({ product, onClick }) => {
    const { name, ingredients } = product;

    return (
        <Card raised={true} onClick={() => onClick(product)}>
            <div className="card-image">
                <Image src={'https://via.placeholder.com/400.png'} alt={name} />
            </div>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                {!isEmpty(ingredients) > 0 && (
                    <Card.Meta>
                        <span
                            className="date">Contains, {ingredients.map(ingredient => ingredient.name).join(', ')}</span>
                    </Card.Meta>
                )}
            </Card.Content>
            <Card.Content extra>
                <Icon name="eur" /> ##
            </Card.Content>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ProductCard;
