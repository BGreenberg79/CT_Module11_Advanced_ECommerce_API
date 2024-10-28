import { useState, useEffect } from 'react';

const ProductList = ({ productId, onProductSelect }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (productId){
            const fetchedProducts = [];
            setProducts(fetchedProducts)
        }
    }, [productId])
}

    return(
        <div>
            <h3>Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id} onClick={()=> onProductSelect(product.id)}>Product ID: {product.id}, Product Name:{prodct.name} Product Type: {product.product_type}, Price: {product.price}</li>
                ))}
            </ul>
        </div>
    )

    export default ProductList