import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const OrderForm = () => {

        const customerIdRef =useRef(null);
        const orderStatusRef= useRef(null);
        const productsRef = useRef(null);
        const totalPriceRef=useRef(null);
        const [errors, setErrors] =useState ({});

        const [customerId, setCustomerId] = useState();
        const [orderStatus, setOrderStatus] = useState();
        const [products, setProducts] = useState();
        const [totalPrice, setTotalPrice] = useState();

        useEffect(() => {
            if (selectedOrder) {
                setCustomerId(selectedOrder.customerId);
                setOrderStatus(selectedOrder.orderStatus);
                setProducts(selectedOrder.products);
                setTotalPrice(selectedOrder.totalPrice);
            }
        }, [selectedOrder]);

        const validateForm = () => {
            const errors ={};
            customerId= customerIdRef.current.value;
            orderStatus= orderStatusRef.current.value;
            products= productsRef.current.value;
            totalPrice=totalPriceRef.current.value;
            if (!customerId) errors.customerId= 'Customer required for order';
            if (!orderStatus) errors.orderStatus ='Order Status required for order';
            if (!products) errors.products = 'Products required for order';
            if (!totalPrice || price <= 0) errors.totalPrice = 'Total Price must be greater than $0';
            return errors
        }

        const handleSubmission = async (event) =>{
            event.preventDefault();
            const errors= validateForm();
            if (Object.keys(errors).length == 0){
            const orderData = {customerId, orderStatus, products, totalPrice};
            try{
                if (selectedOrder) {
                    await axios.put(`http://127.0.0.1:5000/orders/${selectedOrder.id}`, orderData);
                } else
                    {await axios.post('http://127.0.0.1:5000/orders', orderData);
            } onOrderUpdated();
            setCustomerId('');
            setOrderStatus('');
            setProducts('');
            setTotalPrice('');
            } catch(error) {console.error("Error submitting order:", error);}} else {setErrors(errors);}}

    return (
        <form>
            <h2>{selectedOrder ? 'Edit' : 'New'} Order</h2>
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

        </form>
    )
}

export default OrderForm