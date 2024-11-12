import { useState, useEffect } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';

const CustomerForm = () => {
    const { id } = useParams();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        console.log('editing customer, customer_id:', id);
        // Fetch customer data using axios if customer_id exists
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    setSelectedCustomer(response.data);
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                    setErrorMessage('Failed to load customer data');
                });
        }
    }, [id]);

    // Populate form fields when selectedCustomer changes
    useEffect(() => {
        if (selectedCustomer) {
            setCustomerName(selectedCustomer.name); 
            setEmail(selectedCustomer.email);
            setTelephone(selectedCustomer.phone); 
        } else {
            setCustomerName("");
            setEmail("");
            setTelephone("");
        }
    }, [selectedCustomer]);

    const validateForm = () => {
        const errors = {};

        if (!customerName) errors.customerName = 'Name required for customer accounts';
        if (!email) errors.email = 'Email required for account';
        if (!telephone) errors.telephone = 'Phone required for account';

        return errors;
    };

    const handleSubmission = async (event) => {
        event.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            const customerData = { 
                "name": customerName, 
                "email": email, 
                "phone": telephone 
            };

            try {
                if (selectedCustomer) {
                    // Update existing customer
                    await axios.put(`http://127.0.0.1:5000/customers/${selectedCustomer.customer_id}`, customerData);
                } else {
                    // Create new customer
                    await axios.post('http://127.0.0.1:5000/customers', customerData);
                    setCustomerName("");
                    setEmail("");
                    setTelephone("");
                }

                setSuccessMessage('Customer submitted successfully');
                setErrorMessage(null);
            } catch (error) {
                console.error("Error submitting customer:", error);
                setErrorMessage('Error submitting customer');
                setSuccessMessage(null);
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <div>
            {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>{errorMessage}</Alert>}

            <Form className="border border-danger">
                <h2 className='text-center'>{selectedCustomer ? 'Edit' : 'New'} Customer</h2>
                
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    {errors.customerName && <div style={{ color: "red" }}>{errors.customerName}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telephone:</Form.Label>
                    <Form.Control
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                    {errors.telephone && <div style={{ color: "red" }}>{errors.telephone}</div>}
                </Form.Group>

                <Button className='shadow-sm m-1 p-1' variant="success" onClick={handleSubmission}>Submit</Button>
            </Form>
        </div>
    );
};

export default CustomerForm;

