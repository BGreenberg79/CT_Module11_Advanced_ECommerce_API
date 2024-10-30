import { useState, useEffect } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap/Row';
import {Col} from 'react-bootstrap/Col';
import {ListGroup} from 'react-bootstrap/ListGroup'
import {Button} from 'react-bootstrap/Button'

const OrderList = ({ orderId, orders, onEditOrder, onOrderDeleted }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () =>{
            try{
                const response = await axios.get('http://127.0.01:5000/orders');
                setOrders(response.data)
            } catch (error) {
                console.error('Error fetching orders', error)
            }
        }
        if (orderId) {
            fetchOrders()
        }
    }, [orderId])

    const deleteOrder = async (id) =>{
        try {
            await axios.delete(`http://127.0.0.1:5000/orders/${id}`)
            onOrderDeleted();
        } catch{ console.error('Error deleting order:', error)

        }
    }

    return(
        <div>
            <Container fluid>
                <Row className='my-2'>
                    <Col>
                        <h3 className='text-center'>Order List</h3>
                    </Col>
                </Row>
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item variant='info' key={order.id}>Order ID: {order.id}, Customer ID:{order.customer_id} Order Status: {order.order_status}, Products: {order.products}, Total Price: {order.total_price}
                    <Button variant='warning' className='shadow-sm m-1 p-1' onClick={onEditOrder(order)}>Edit</Button>
                    <Button variant='danger' className='shadow-sm m-1 p-1' onClick={deleteOrder(order.id)}>Delete</Button></ListGroup.Item>
                ))}
            </ListGroup>
            </Container>
        </div>
    )
}
    export default OrderList