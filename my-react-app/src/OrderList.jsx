import { useState, useEffect } from 'react';

const OrderList = ({ orderId, onOrderSelect }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (orderId){
            const fetchedOrders = [];
            setOrders(fetchedOrders)
        }
    }, [orderId])
}

    return(
        <div>
            <h3>Order List</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={()=> onOrderSelect(order.id)}>Order ID: {order.id}, Customer ID:{order.customer_id} Order Status: {order.order_status}, Products: {order.products}, Total Price: {order.total_price}</li>
                ))}
            </ul>
        </div>
    )

    export default OrderList