import { useState, useEffect } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/products/${id}`)
                .then(response => {
                    setSelectedProduct(response.data);
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                    setErrorMessage('Failed to load product data');
                });
        }
    }, [id]);

    // populate edit form fields when selectedProduct is set

    useEffect(() => {
        if (selectedProduct) {
            setProductName(selectedProduct.name);
            setProductType(selectedProduct.product_type);
            setProductPrice(selectedProduct.price);
        } else {
            setProductName("");
            setProductType("");
            setProductPrice("");
        }
    }, [selectedProduct]);

    const validateForm = () => {
        const errors = {};

        if (!productName) errors.productName = 'Product Name required to add or edit product';
        if (!productType) errors.productType = 'Product Type required';
        if (!productPrice || productPrice <= 0) errors.productPrice = 'Price must be greater than $0';

        return errors;
    };

    const handleSubmission = async (event) => {
        event.preventDefault();
        const errors = validateForm();

        // TODO: Add key values for product Data 
        if (Object.keys(errors).length === 0) {
            const productData = {
                "name": productName,
                "product_type": productType,
                "price": productPrice
            };

            try {
                if (selectedProduct) {
                    await axios.put(`http://127.0.0.1:5000/products/${id}`, productData);
                } else {
                    await axios.post('http://127.0.0.1:5000/products', productData);
                    setProductName("");
                    setProductType("");
                    setProductPrice("");
                }

                setSuccessMessage('Product submitted successfully');
                setErrorMessage(null);
            } catch (error) {
                console.error("Error submitting product:", error);
                setErrorMessage('Error submitting product');
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

            <Form>
                <h2 className='text-center'>{selectedProduct ? 'Edit' : 'New'} Product</h2>

                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    {errors.productName && <div style={{ color: "red" }}>{errors.productName}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Type:</Form.Label>
                    <Form.Control
                        type="text"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                    />
                    {errors.productType && <div style={{ color: "red" }}>{errors.productType}</div>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    {errors.productPrice && <div style={{ color: "red" }}>{errors.productPrice}</div>}
                </Form.Group>

                <Button className='shadow-sm m-1 p-1' variant="success" onClick={handleSubmission}>Submit</Button>
            </Form>
        </div>
    );
};

export default ProductForm;
