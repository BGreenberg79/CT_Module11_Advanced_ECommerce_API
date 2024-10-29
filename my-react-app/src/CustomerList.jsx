import { useState, useEffect } from 'react';

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
            <h3>Customer List</h3>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>Customer ID: {customer.id}, Customer Name:{customer.name} Customer Email: {customer.email}, Telephone: {customer.telephone}
                    <button onClick={onEditCustomer(customer)}>Edit</button>
                    <button onClick={deleteCustomer(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
    export default CustomerList