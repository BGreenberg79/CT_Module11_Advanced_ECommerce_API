import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const CustomerForm = () => {

    const customerNameRef =useRef(null);
    const emailRef= useRef(null);
    const telephoneRef = useRef(null);
    const [errors, setErrors] =useState ({});

    const [customerName, setCustomerName] =useState();
    const [email, setEmail] = useState();
    const [telephone, setTelephone] = useState();
    
    useEffect(()=> {
        if (selectedCustomer) {
            setCustomerName(selectedCustomer.customerName);
            setEmail(selectedCustomer.email);
            setTelephone(selectedCustomer.telephone);
        }
    }, [selectedCustomer]);

    const validateForm = () => {
        const errors ={};
        customerName= customerNameRef.current.value;
        email= emailRef.current.value;
        telephone= telephoneRef.current.value;
        if (!customerName) errors.customerName= 'Name required for customer accounts';
        if (!email) errors.email ='Email required for account';
        if (!telephone) errors.telephone = 'Phone required for account';
        return errors}

    const handleSubmission = async (event) =>{
        event.preventDefault();
        const errors= validateForm();
        if (Object.keys(errors).length == 0){
            const customerData = {customerName, email, telephone};
            try {
                if (selectedCustomer) {
                    await axios.put(`http://127.0.0.1:5000/customers/${selectedCustomer.id}`, customerData);
                } else
                    {await axios.post('http://127.0.0.1:5000/customers', customerData);}
                onCustomerUpdated();
                setCustomerName('');
                setEmail('');
                setTelephone('');
            } catch (error) {console.error("Error submitting customer:", error);}
        }
        else{setErrors(errors);}
    }
    return (
        <Form className="border border-danger">
            <h2 className='text-center'>{selectedCustomer ? 'Edit' : 'New'} Customer</h2>
            <Form.Group>
                <Form.Label for="name">Name:</Form.Label>
                <Form.Control type="text" id="name" name="name" ref={customerNameRef}></Form.Control>
                {errors.customerName && <div style={{color:"red"}}>{errors.customerName}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label for="email">Email:</Form.Label>
                <Form.Control type="text" id="email" name="email" ref={emailRef}></Form.Control>
                {errors.email && <div style={{color:"red"}}>{errors.email}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label for="telephone">Telephone:</Form.Label>
                <Form.Control type="tel" id="telephone" name="telephone" ref={telephoneRef}></Form.Control>
                {errors.telephone && <div style={{color:"red"}}>{errors.telephone}</div>}
            </Form.Group>

            <Button className='shadow-sm m-1 p-1' variant="success" onClick={handleSubmission}>Submit</Button>
        </Form>
    )
}

export default CustomerForm