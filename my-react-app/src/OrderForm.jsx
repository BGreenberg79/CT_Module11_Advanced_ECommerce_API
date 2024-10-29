import { useState, useEffect } from "react";
import axios from 'axios';

const OrderForm = () => {

        const customerIdRef =useRef(null);
        const orderStatusRef= useRef(null);
        const productsRef = useRef(null);
        const totalPriceRef=useRef(null);
        const [errors, setErrors] =useState ({});

        const validateForm = () => {
            const errors ={};
            const customerId= customerIdRef.current.value;
            const orderStatus= orderStatusRef.current.value;
            const products= productsRef.current.value;
            const totalPrice=totalPriceRef.current.value;
            if (!customerId) errors.customerId= 'Customer required for order';
            if (!orderStatus) errors.orderStatus ='Order Status required for order';
            if (!products) errors.products = 'Products required for order';
            if (!totalPrice || price <= 0) errors.totalPrice = 'Total Price must be greater than $0';
            return errors
        }

        const handleSubmission = (event) =>{
            event.preventDefault();
            const errors= validateForm();
            if (Object.keys(errors).length == 0){
            const customerId= customerIdRef.current.value;
            const orderStatus= orderStatusRef.current.value;
            const products= productsRef.current.value;
            const totalPrice=totalPriceRef.current.value;}
            else{setErrors(errors);}
        };
    return (
        <form>
            <label for="customer_id">Customer ID:</label>
            <input type="int" id="customer_id" name="customer_id" ref={customerIdRef}></input> 
            {errors.customerId && <div style={{color:"red"}}>{errors.customerId}</div>}

            <label for="order_status">Order Status:</label>
            <input type="text" id="order_status" name="order_status" ref={orderStatusRef}></input>
            {errors.orderStatus && <div style={{color:"red"}}>{errors.orderStatus}</div>}

            <label for="products">Products:</label>
            <input type="list" id="products" name="products" ref={productsRef}></input>
            {errors.products && <div style={{color:"red"}}>{errors.prodcts}</div>}

            <label for="total_price">Total Price:</label>
            <input type="float" id="total_price" name="total_price" ref={totalPriceRef}></input>
            {errors.totalPrice && <div style={{color:"red"}}>{errors.totalPrice}</div>}

            <button onClick={handleSubmission}>Submit</button>

            {/* customer_id = fields.Int(required=True)
    date = fields.Date(required=True)
    order_status = fields.Str(required=True)
    products = fields.List(fields.Nested(ProductSchema))
    total_price = fields.Float(required=True, validate=validate.Range(min=0)) */}

        </form>
    )
}

export default OrderForm