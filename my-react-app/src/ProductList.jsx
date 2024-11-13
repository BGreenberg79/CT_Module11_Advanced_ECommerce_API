import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



const ProductList = () => {
    const [productsList, setProductsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () =>{
            try{
                const response = await axios.get('http://127.0.01:5000/products');
                setProductsList(response.data)
            } catch (error) {
                console.error('Error fetching products', error)
            }
        }

        fetchProducts()
        
    }, [])

    const editProduct = (product) => {
    if (product.product_id) {
        navigate(`/products/edit/${product.product_id}`)
    } else { 
        console.error('Error editing product:', error);}
    };

    const deleteProduct = async (id) =>{
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`)
            onProductDeleted();
        } catch{ console.error('Error deleting product:', error)

        }
    }

    // on edit function 
    // TODO: add useNavigate into this page to navigate user to product form 


    return(
        <div>
            <Container fluid>
                <Row className='my-2'>
                    <Col>
                        <h3 className='text-center'>Product List</h3>
                    </Col>
                </Row>
                <ListGroup>
                    {productsList.map(product => (
                    <ListGroup.Item variant='info' key={product.product_id}>
                            Product ID: {product.product_id}, Product Name:{product.name} Product Type: {product.product_type}, Price: {product.price}
                        <Button variant='warning' className='shadow-sm m-1 p-1' onClick={() => editProduct(product)}>
                            Edit
                        </Button>
                        <Button variant='danger' className='shadow-sm m-1 p-1'  onClick={() => deleteProduct(product.product_id)}>
                            Delete
                        </Button>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
    export default ProductList