import { useState, useEffect } from "react";
import axios from 'axios';

const CustomerForm = () => {
    return (
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name"></input>

            <label for="email">Email:</label>
            <input type="text" id="email" name="email"></input>

            <label for="telephone">Telephone:</label>
            <input type="tel" id="telephone" name="telephone"></input>
        </form>
    )
}

export default CustomerForm