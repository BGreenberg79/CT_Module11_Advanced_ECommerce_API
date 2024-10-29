import { useState, useEffect } from "react";
import axios from 'axios';

const CustomerForm = () => {

    const customerNameRef =useRef(null);
    const emailRef= useRef(null);
    const telephoneRef = useRef(null);
    const [errors, setErrors] =useState ({});


    const validateForm = () => {
        const errors ={};
        const customerName= customerNameRef.current.value;
        const email= emailRef.current.value;
        const telephone= telephoneRef.current.value;
        if (!customerName) errors.customerName= 'Name required for customer accounts';
        if (!email) errors.email ='Email required for account';
        if (!telephone) errors.telephone = 'Phone required for account';
        return errors}

    const handleSubmission = (event) =>{
        event.preventDefault();
        const errors= validateForm();
        if (Object.keys(errors).length == 0){
        const customerName= customerNameRef.current.value;
        const email= emailRef.current.value;
        const telephone= telephoneRef.current.value;}
        else{setErrors(errors)}
    }
    return (
        <form>
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