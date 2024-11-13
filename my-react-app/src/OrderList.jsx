import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
    const [ordersList, setOrdersList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/orders');
                console.log('Orders:', response.data);
                setOrdersList(response.data)
            } catch (error) {
                console.error('Error fetching orders', error)
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/orders/${id}`)
            setOrdersList((prevList) => prevList.filter((order) => order.order_id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const editOrder = (order) => {
        if (order.order_id) {
            navigate(`/orders/edit/${order.order_id}`);
        } else {
            console.error('Error editing order:', error);
        }
    };

    return (
        <div>
            <Container fluid>
                <Row className='my-2'>
                    <Col>
                        <h3 className='text-center'>Order List</h3>
                    </Col>
                </Row>
                <ListGroup>
                    {ordersList.map(order => (
                        <ListGroup.Item variant='info' key={order.order_id}>

                            <div>Order ID: {order.order_id}</div>
                            <div>Customer ID: {order.customer_id}</div>
                            <div>Order Status: {order.order_status}</div>
                            <div>
                                Products:
                                <ul>
                                    {order.products.map((product) => (
                                        <li key={product.product_id}>
                                            Name: {product.name}, ID: {product.product_id}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button variant='warning' className='shadow-sm m-1 p-1' onClick={() => editOrder(order)}>
                                Edit
                            </Button>
                            <Button variant='danger' className='shadow-sm m-1 p-1' onClick={() => deleteOrder(order.order_id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
export default OrderList