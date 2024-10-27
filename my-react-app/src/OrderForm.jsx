import { useState, useEffect } from "react";
import axios from 'axios';

const OrderForm = () => {
    return (
        <form>
            <label for="customer_id">Customer ID:</label>
            <input type="int" id="customer_id" name="customer_id"></input>

            <label for="order_status">Order Status:</label>
            <input type="text" id="order_status" name="order_status"></input>

            <label for="products">Products:</label>
            <input type="list" id="products" name="products"></input>

            <label for="total_price">Total Price:</label>
            <input type="float" id="total_price" name="total_price"></input>

            {/* customer_id = fields.Int(required=True)
    date = fields.Date(required=True)
    order_status = fields.Str(required=True)
    products = fields.List(fields.Nested(ProductSchema))
    total_price = fields.Float(required=True, validate=validate.Range(min=0)) */}

        </form>
    )
}

export default OrderForm