import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard'
import { bindActionCreators } from "redux";
import { setProduct } from "../../../state/actions/productsAction";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const ProductCardGrid = ({ products, setProduct }) => {
    const history = useHistory();

    const handleProductClick = (product) => {
        const { id, type } = product;
        setProduct({ product })
        history.replace(`/builder/${id}?type=${type}`)
    }
    return (
        <Card.Group stackable={true}>
            {/*<p>Hello</p>*/}
            {products.map((product, i) =>
                <ProductCard
                    key={i}
                    product={product}
                    onClick={handleProductClick}
                />
            )};
        </Card.Group>
    );
};

ProductCardGrid.propTypes = {
    products: PropTypes.array.isRequired,
    setProduct: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setProduct
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(ProductCardGrid);


// export default ProductCardGrid;
