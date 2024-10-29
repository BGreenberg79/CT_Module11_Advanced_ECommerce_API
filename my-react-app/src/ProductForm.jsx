import { useState, useEffect, useRef } from "react";
import axios from 'axios';

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
        <form>
            <h2>{selectedProduct ? 'Edit' : 'New'} Product</h2>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" ref={productNameRef}></input>
            {errors.productName && <div style={{color:"red"}}>{errors.productName}</div>}

            <label for="product_type">Product Type:</label>
            <input type="text" id="product_type" name="product_type" ref={productTypeRef}></input>
            {errors.productType && <div style={{color:"red"}}>{errors.productType}</div>}

            <label for="price">Price:</label>
            <input type="float" id="price" name="price" ref={productPriceRef}></input>
            {errors.productPrice && <div style={{color:"red"}}>{errors.productPrice}</div>}

            <button onClick={handleSubmission}>Submit</button>
            </form>
    )
}

export default ProductForm