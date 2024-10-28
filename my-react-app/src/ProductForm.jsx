import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const ProductForm = () => {
        const productNameRef =useRef(null);
        const productTypeRef= useRef(null);
        const productPriceRef = useRef(null);

        const handleSubmission = (event) =>{
            event.preventDefault();
            const productName= productNameRef.current.value;
            const productType= productTypeRef.current.value;
            const productPrice= productPriceRef.current.value;
        }
    
    return (
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" ref={productNameRef}></input>

            <label for="product_type">Product Type:</label>
            <input type="text" id="product_type" name="product_type" ref={productTypeRef}></input>

            <label for="price">Price:</label>
            <input type="float" id="price" name="price" ref={productPriceRef}></input>
        </form>
    )
}

export default ProductForm