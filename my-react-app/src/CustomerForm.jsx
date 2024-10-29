import { useState, useEffect } from "react";
import axios from 'axios';

const CustomerForm = () => {

    const customerNameRef =useRef(null);
    const emailRef= useRef(null);
    const telephoneRef = useRef(null);

    const handleSubmission = (event) =>{
        event.preventDefault();
        const customerName= customerNameRef.current.value;
        const email= emailRef.current.value;
        const telephone= telephoneRef.current.value;
    }
    return (
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" ref={customerNameRef}></input>

            <label for="email">Email:</label>
            <input type="text" id="email" name="email" ref={emailRef}></input>

            <label for="telephone">Telephone:</label>
            <input type="tel" id="telephone" name="telephone" ref={telephoneRef}></input>

            <button onClick={handleSubmission}>Submit</button>
        </form>
    )
}

export default CustomerForm