import { useState, useEffect } from "react";
import axios from 'axios';

const ProductForm = () => {
    return (
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name"></input>

            <label for="product_type">Product Type:</label>
            <input type="text" id="product_type" name="product_type"></input>

            <label for="price">Price:</label>
            <input type="float" id="price" name="price"></input>
        </form>
    )
}

export default ProductForm