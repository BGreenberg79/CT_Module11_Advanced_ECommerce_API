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
    // note from kate: added this back in
    const [productsID, setProductsId] = useState([]);
    // const [products, setProducts] = useState([]);
    // const [totalPrice, setTotalPrice] = useState("");
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

            // Map out selectedOrder.products and append each of their ids to the new array
            // once the new array is an array of product IDs, setProductID(newArr)

            let newArr = [] 
            selectedOrder.products.map(product => newArr.push(product.product_id))

            setProductsId(newArr);
            // setTotalPrice(selectedOrder.total_price); 

        } 
        
        // Note from Kate: I think we can get rid of this else statement since the form is automatically resetting the state when it is reloaded 
        // else {
        //     setDate("");
        //     setCustomerId("");
        //     setOrderStatus("");
        //     setProductsId([]);
        //     // setTotalPrice("");
        // }
    }, [selectedOrder]);

    const validateForm = () => {
        const errors = {};

        if (!date) errors.date = 'Date required for order';
        if (!customerId) errors.customerId = 'Customer Id required for order';
        if (!orderStatus) errors.orderStatus = 'Order Status required for order';
        // added this back in 
        if (!productsID) errors.products = 'Products required for order';

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
                "products": productsID
            };

            console.log(orderData);

            try {
                if (selectedOrder) {
                    console.log("Selected")
                    // Update existing customer
                    await axios.put(`http://127.0.0.1:5000/orders/${selectedOrder.order_id}`, orderData);
                } else {
                    // Create new customer
                    await axios.post('http://127.0.0.1:5000/orders', orderData);

                    // Clear form after submission
                    setDate("");
                    setCustomerId("");
                    setOrderStatus("");
                    setProductsId([]);
                    // setTotalPrice("");
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


                { selectedOrder ? (
                    <>
                        <Form.Group>
                        <Form.Label>Products:</Form.Label>
                        <Form.Control
                            type="text"
                            value={productsID.join(", ")} // Display the array as a comma-separated string
                            onChange={(e) => setProductsId(e.target.value.split(",").map(id => id.trim()))}
                        />
                        {errors.products && <div style={{ color: "red" }}>{errors.products}</div>}
                        </Form.Group>

                    </>
                ) : (
                    <>
                        <Form.Group>
                        <Form.Label>Products:</Form.Label>
                        <Form.Control
                            type="text"
                            value={productsID.join(", ")} // Display the array as a comma-separated string
                            onChange={(e) => setProductsId(e.target.value.split(",").map(id => id.trim()))}
                        />
                        {errors.products && <div style={{ color: "red" }}>{errors.products}</div>}
                        </Form.Group>
                    </>
                )


                }



                {/* <Form.Group>
                    <Form.Label>Total Price:</Form.Label>
                    <Form.Control
                        type="number"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                    />
                    {errors.totalPrice && <div style={{ color: "red" }}>{errors.totalPrice}</div>}
                </Form.Group> */}

                <Button className='shadow-sm m-1 p-1' variant="success" onClick={handleSubmission}>Submit</Button>
            </Form>
    </div>
  )
}

export default OrderForm