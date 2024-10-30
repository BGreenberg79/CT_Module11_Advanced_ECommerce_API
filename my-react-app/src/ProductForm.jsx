import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import {Form} from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap/Button'

const ProductForm = () => {
        const productNameRef =useRef(null);
        const productTypeRef= useRef(null);
        const productPriceRef = useRef(null);
        const [errors, setErrors] =useState ({});

        const [productName, setProductName] = useState();
        const [productType, setProductType] = useState();
        const [productPrice, setProductPrice] = useState();

        useEffect(()=> {
            if (selectedProduct){
                setProductName(selectedProduct.productName);
                setProductType(selectedProduct.productType);
                setProductPrice(selectedProduct.productPrice);
            }
        }, [selectedProduct]);

        const validateForm = () => {
            const errors ={};
            productName= productNameRef.current.value;
            productType= productTypeRef.current.value;
            productPrice= productPriceRef.current.value;
            if (!productName) errors.productName= 'Product Name required to add or edit product to catalogue';
            if (!productType) errors.productType ='Product Type required for catalogue';
            if (!productPrice || productPrice <= 0) errors.productPrice = 'Price must be greater than $0';
            return errors
        }

        const handleSubmission = async (event) =>{
            event.preventDefault();
            const errors= validateForm();
            if (Object.keys(errors).length == 0){
                const productData = {productName, productType, productPrice};
            try{ 
                if (selectedProduct) {
                    await axios.put(`http://127.0.0.1:5000/products/${selectedProduct.id}`, productData);
                } else
                    {await axios.post('http://127.0.0.1:5000/products', productData);
            } onProductUpdated();
            setProductName('');
            setProductPrice('');
            setProductType('');
        } catch(error) {console.error("Error submitting product:", error);}} else {setErrors(errors);}}
    
    return (
        <Form>
            <h2 className='text-center'>{selectedProduct ? 'Edit' : 'New'} Product</h2>
            <Form.Group>
                <Form.Label for="name">Name:</Form.Label>
                <Form.Control type="text" id="name" name="name" ref={productNameRef}></Form.Control>
                {errors.productName && <div style={{color:"red"}}>{errors.productName}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label for="product_type">Product Type:</Form.Label>
                <Form.Control type="text" id="product_type" name="product_type" ref={productTypeRef}></Form.Control>
                {errors.productType && <div style={{color:"red"}}>{errors.productType}</div>}
            </Form.Group>

            <Form.Group>
            <Form.Label for="price">Price:</Form.Label>
            <Form.Control type="float" id="price" name="price" ref={productPriceRef}></Form.Control>
            {errors.productPrice && <div style={{color:"red"}}>{errors.productPrice}</div>}
            </Form.Group>

            <Button variant='success' className='shadow-sm m-1 p-1' onClick={handleSubmission} >Submit</Button>
        </Form>
    )
}

export default ProductForm