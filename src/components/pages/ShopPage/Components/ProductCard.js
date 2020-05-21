import React from 'react'
import {  Card, Icon, Image } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ProductCard = ({ product}) => {
    const history = useHistory();
    const { id, name, ingredients, type} = product;

    return (
        <Card raised={true} onClick={() => history.replace(`/builder/${id}?type=${type}`) }>
            <div className="card-image">
                <Image src={'https://via.placeholder.com/400.png'} alt={name} />
            </div>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                {ingredients.length > 0 && (
                    <Card.Meta>
                        <span className="date">Contains, {ingredients.map(ingredient => ingredient.name).join(', ')}</span>
                    </Card.Meta>
                )}
            </Card.Content>
            <Card.Content extra>
                <Icon name="eur" /> ##
            </Card.Content>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard
