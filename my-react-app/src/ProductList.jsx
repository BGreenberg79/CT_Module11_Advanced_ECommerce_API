import { useState, useEffect } from 'react';

const ProductList = ({ productId, products, onEditProduct, onProductDeleted }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () =>{
            try{
                const response = await axios.get('http://127.0.01:5000/products');
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        if (productId) {
            fetchProducts()
        }
    }, [productId])

    const deleteProduct = async (id) =>{
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`)
            onProductDeleted();
        } catch{ console.error('Error deleting product:', error)

        }
    }


    return(
        <div>
            <h3>Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>Product ID: {product.id}, Product Name:{prodct.name} Product Type: {product.product_type}, Price: {product.price}
                    <button onClick={()=>onEditProduct(product)}>Edit</button>
                    <button onClick={()=>deleteProduct(product.id)}>Delete</button></li>
                ))}
            </ul>
        </div>
    )
}
    export default ProductList