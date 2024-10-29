import { useState, useEffect } from 'react';

const CustomerList = ({ costumerId, onCustomerSelect }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () =>{
            try{

            } catch (error) {
                console.error('Error fetching products', error)
            }
        }
        if (customerId){
            const fetchedCustomers = [];
            setCustomers(fetchedCustomers)
        }
    }, [customerId])
}

    return(
        <div>
            <h3>Customer List</h3>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id} onClick={()=> onCustomerSelect(customer.id)}>Customer ID: {customer.id}, Customer Name:{customer.name} Customer Email: {customer.email}, Telephone: {customer.telephone}</li>
                ))}
            </ul>
        </div>
    )

    export default CustomerList