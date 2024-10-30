import { useState, useEffect } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap/Container';
import {Row} from 'react-bootstrap/Row';
import {Col} from 'react-bootstrap/Col';
import {ListGroup} from 'react-bootstrap/ListGroup'
import {Button} from 'react-bootstrap/Button'


const CustomerList = ({ customers, customerId, onEditCustomer, onCustomerDeleted }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () =>{
            try{
                const response = await axios.get('http://127.0.01:5000/customers');
                setCustomers(response.data)
            } catch (error) {
                console.error('Error fetching customers', error)
            }
        }
        if (customerId) {
            fetchCustomers()
        }
    }, [customerId])

    const deleteCustomer = async (id) =>{
        try {
            await axios.delete(`http://127.0.0.1:5000/customers/${id}`)
            onCustomerDeleted();
        } catch{ console.error('Error deleting customer:', error)
        }
    }   

    return(
        <div>
            <Container fluid>
                <Row className='my-2'>
                    <Col>
                        <h3 className='text-center'>Customer List</h3>
                    </Col>
                </Row>
                <ListGroup>
                    {customers.map(customer => (
                        <ListGroup.Item variant='info' key={customer.id}>Customer ID: {customer.id}, Customer Name:{customer.name} Customer Email: {customer.email}, Telephone: {customer.telephone}
                        <Button variant='warning' className='shadow-sm m-1 p-1' onClick={onEditCustomer(customer)}>Edit</Button>
                        <Button variant='danger' classname='shadow-sm m-1 p-1' onClick={deleteCustomer(customer.id)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
    export default CustomerList