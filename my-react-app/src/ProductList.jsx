import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


const ProductList = ({ productId, onEditProduct, onProductDeleted }) => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () =>{
            try{
                const response = await axios.get('http://127.0.01:5000/products');
                setProductsList(response.data)
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
            <Container fluid>
                <Row clasName='my-2'>
                    <Col>
                        <h3 className='text-center'>Product List</h3>
                    </Col>
                </Row>
                <ListGroup>
                    {productsList.map(product => (
                        <ListGroup.Item variant='info' key={product.id}>Product ID: {product.id}, Product Name:{prodct.name} Product Type: {product.product_type}, Price: {product.price}
                        <Button variant='warning' className='shadow-sm m-1 p-1' onClick={()=>onEditProduct(product)}>Edit</Button>
                        <Button variant='danger' className='shadow-sm m-1 p-1'  onClick={()=>deleteProduct(product.id)}>Delete</Button></ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
    export default ProductList