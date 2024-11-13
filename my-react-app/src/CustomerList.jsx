import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// ADDED 
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
    const [customersList, setCustomersList] = useState([]);
    // ADDED 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/customers');
                setCustomersList(response.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };

        fetchCustomers();
    }, []);

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
            setCustomersList((prevList) => prevList.filter((customer) => customer.customer_id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    // ADDED 
    const editCustomer = (customer) => {
        if (customer.customer_id) {
            navigate(`/customer/edit/${customer.customer_id}`);
        } else {
            console.error('Error editing customer:', error);
        }
    };

    return (
        <div>
            <Container fluid>
                <Row className='my-2'>
                    <Col>
                        <h3 className='text-center'>Customer List</h3>
                    </Col>
                </Row>
                <ListGroup>
                    {customersList.map((customer) => (
                        <ListGroup.Item variant='info' key={customer.customer_id}>
                            Customer ID: {customer.customer_id}, Customer Name: {customer.name}, Customer Email: {customer.email}, Telephone: {customer.phone}
                            <Button variant='warning' className='shadow-sm m-1 p-1' onClick={() => editCustomer(customer)}>
                                Edit
                            </Button>
                            <Button variant='danger' className='shadow-sm m-1 p-1' onClick={() => deleteCustomer(customer.customer_id)}>
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
};

export default CustomerList;
