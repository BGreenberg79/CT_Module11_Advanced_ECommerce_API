import { useState, useEffect } from "react";
import axios from 'axios';

const OrderForm = () => {

        const customerIdRef =useRef(null);
        const orderStatusRef= useRef(null);
        const productsRef = useRef(null);
        const totalPriceRef=useRef(null);

        const handleSubmission = (event) =>{
            event.preventDefault();
            const customerId= customerIdRef.current.value;
            const orderStatus= orderStatusRef.current.value;
            const products= productsRef.current.value;
            const totalPriceRef=totalPriceRef.current.value;
        }
    return (
        <form>
            <label for="customer_id">Customer ID:</label>
            <input type="int" id="customer_id" name="customer_id" ref={customerIdRef}></input>

            <label for="order_status">Order Status:</label>
            <input type="text" id="order_status" name="order_status" ref={orderStatusRef}></input>

            <label for="products">Products:</label>
            <input type="list" id="products" name="products" ref={productsRef}></input>

            <label for="total_price">Total Price:</label>
            <input type="float" id="total_price" name="total_price" ref={totalPriceRef}></input>

            {/* customer_id = fields.Int(required=True)
    date = fields.Date(required=True)
    order_status = fields.Str(required=True)
    products = fields.List(fields.Nested(ProductSchema))
    total_price = fields.Float(required=True, validate=validate.Range(min=0)) */}

        </form>
    )
}

export default OrderForm