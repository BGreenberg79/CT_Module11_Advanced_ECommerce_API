import { useState, useEffect } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';


const OrderForm = () => {
    const { id } = useParams();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [date, setDate] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    // const [products, setProducts] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/orders/${id}`)
                .then(response => {
                    setSelectedOrder(response.data);
                })
                .catch(error => {
                    console.error('Error fetching order data:', error);
                    setErrorMessage('Failed to load order data');
                });
        }
    }, [id]);

    useEffect(() => {
        if (selectedOrder) {
            setDate(selectedOrder.date); 
            setCustomerId(selectedOrder.customer_id);
            setOrderStatus(selectedOrder.order_status); 
            // setProducts(selectedOrder.products);
            setTotalPrice(selectedOrder.total_price); 

        } else {
            setDate("");
            setCustomerId("");
            setOrderStatus("");
            // setProducts("");
            setTotalPrice("");
        }
    }, [selectedOrder]);

    const validateForm = () => {
        const errors = {};

        if (!date) errors.date = 'Date required for order';
        if (!customerId) errors.customerId = 'Customer Id required for order';
        if (!orderStatus) errors.orderStatus = 'Order Status required for order';
        // if (!products) errors.products = 'Products required for order';
        if(!totalPrice) errors.totalPrice = 'Total price required for order';

        return errors;
    };

    const handleSubmission = async (event) => {
        event.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            const orderData = { 
                "date": date, 
                "customer_id": customerId, 
                "order_status": orderStatus,
                // "products": products,
                "total_price": totalPrice 
            };

            try {
                if (selectedOrder) {
                    // Update existing customer
                    await axios.put(`http://127.0.0.1:5000/orders/${selectedOrder.order_id}`, orderData);
                } else {
                    // Create new customer
                    await axios.post('http://127.0.0.1:5000/orders', orderData);
                    setDate("");
                    setCustomerId("");
                    setOrderStatus("");
                    // setProducts("");
                    setTotalPrice("");
                }

                setSuccessMessage('Order submitted successfully');
                setErrorMessage(null);
            } catch (error) {
                console.error("Error submitting order:", error);
                setErrorMessage('Error submitting order');
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
                <h2 className='text-center'>{selectedOrder ? 'Edit' : 'New'} Order</h2>
                
                <Form.Group>
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <div style={{ color: "red" }}>{errors.date}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Customer Id:</Form.Label>
                    <Form.Control
                        type="number"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                    {errors.customerId && <div style={{ color: "red" }}>{errors.customerId}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Order Status:</Form.Label>
                    <Form.Control
                        type="text"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                    />
                    {errors.orderStatus && <div style={{ color: "red" }}>{errors.orderStatus}</div>}
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label>Products:</Form.Label>
                    <Form.Control
                        type="text"
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                    />
                    {errors.products && <div style={{ color: "red" }}>{errors.products}</div>}
                </Form.Group> */}

                <Form.Group>
                    <Form.Label>Total Price:</Form.Label>
                    <Form.Control
                        type="number"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                    />
                    {errors.totalPrice && <div style={{ color: "red" }}>{errors.totalPrice}</div>}
                </Form.Group>

                <Button className='shadow-sm m-1 p-1' variant="success" onClick={handleSubmission}>Submit</Button>
            </Form>
    </div>
  )
}

export default OrderForm