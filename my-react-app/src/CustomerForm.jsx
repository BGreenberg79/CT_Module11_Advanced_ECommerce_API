import { useState, useEffect, useRef } from "react";
import axios from 'axios';

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
        <form>
            <h2>{selectedCustomer ? 'Edit' : 'New'} Customer</h2>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" ref={customerNameRef}></input>
            {errors.customerName && <div style={{color:"red"}}>{errors.customerName}</div>}

            <label for="email">Email:</label>
            <input type="text" id="email" name="email" ref={emailRef}></input>
            {errors.email && <div style={{color:"red"}}>{errors.email}</div>}

            <label for="telephone">Telephone:</label>
            <input type="tel" id="telephone" name="telephone" ref={telephoneRef}></input>
            {errors.telephone && <div style={{color:"red"}}>{errors.telephone}</div>}

            <button onClick={handleSubmission}>Submit</button>
        </form>
    )
}

export default CustomerForm