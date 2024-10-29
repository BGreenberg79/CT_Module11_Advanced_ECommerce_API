import { useState, useEffect } from 'react';

const OrderList = ({ orderId, orders, onEditOrder, onOrderDeleted }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () =>{
            try{
                const response = await axios.get('http://127.0.01:5000/orders');
                setOrders(response.data)
            } catch (error) {
                console.error('Error fetching orders', error)
            }
        }
        if (orderId) {
            fetchOrders()
        }
    }, [orderId])

    const deleteOrder = async (id) =>{
        try {
            await axios.delete(`http://127.0.0.1:5000/orders/${id}`)
            onOrderDeleted();
        } catch{ console.error('Error deleting order:', error)

        }
    }

    return(
        <div>
            <h3>Order List</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>Order ID: {order.id}, Customer ID:{order.customer_id} Order Status: {order.order_status}, Products: {order.products}, Total Price: {order.total_price}
                    <button onClick={onEditOrder(order)}>Edit</button>
                    <button onClick={deleteOrder(order.id)}>Delete</button></li>
                ))}
            </ul>
        </div>
    )
}
    export default OrderList