import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard'

const ProductCardGrid = ({ products }) => {
    // console.log('in list', products);
    return (
        <Card.Group stackable={true} >
            {/*<p>Hello</p>*/}
            {products.map((product, i) =>
                <ProductCard key={i} product={product} />
            )};
        </Card.Group>
    );
};


ProductCardGrid.propTypes = {
    products: PropTypes.array.isRequired
};

export default ProductCardGrid;
