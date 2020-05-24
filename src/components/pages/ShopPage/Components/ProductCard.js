import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const ProductCard = ({ product, onClick }) => {
    const { name, ingredients, unitPrice, image, description } = product;

    return (
        <Card raised={true} onClick={() => onClick(product)}>
            <div className="card-image">
                <Image src={image} alt={name}  />
            </div>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                {!isEmpty(ingredients) ? (
                    <Card.Meta>
                        <span className="date">
                            Contains: {ingredients.map(ingredient => ingredient.name).join(', ')}
                        </span>
                    </Card.Meta>
                ) : (
                    <Card.Meta>
                        <span className="date">
                            {description}
                        </span>
                    </Card.Meta>
                )}
            </Card.Content>
            <Card.Content>
                <Icon name="dollar" /> {unitPrice}
            </Card.Content>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ProductCard;
