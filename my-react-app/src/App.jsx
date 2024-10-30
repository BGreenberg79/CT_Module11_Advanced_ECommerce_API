import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import { useState } from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'




function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] =useState([]);
  const [customers, setCustomers] =useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  useEffect(() =>{
    fetchProducts();
  }, []);

  useEffect(() =>{
    fetchCustomers();
  }, []);
  
  useEffect(() =>{
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:5000/products');
      setProducts(response.data);}
      catch (error) {console.error('Error fetching products', error)}
    
  } 
  
  const fetchCustomers = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:5000/customers');
      setCustomers(response.data);}
      catch (error) {console.error('Error fetching customers', error)}
    
  } 

  const fetchOrders = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:5000/orders');
      setOrders(response.data);}
      catch (error) {console.error('Error fetching orders', error)}
    
  } 

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
  }

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
  }

  const handleProductUpdated = () => {
    fetchProducts();
    setSelectedProduct(null);
  };

  const handleCustomerUpdated = () => {
    fetchCustomers();
    setSelectedCustomer(null);
  };

  const handleOrderUpdated = () => {
    fetchOrders();
    setSelectedOrder(null);
  };

  const handleProductDeleted = () => {
    fetchProducts();
  }

  const handleOrderDeleted = () => {
    fetchOrders();
  }

  const handleCustomerDeleted = () => {
    fetchCustomers();
  }

  return (
    <>
    <NavBar/>
      <h1>E-Commerce API</h1>

      <Routes>
        <Route path="/" element={< Home />}/>
        <Route path="/customers/:id" element={< CustomerForm selectedCustomer={selectedCustomer} onCustomerUpdated={handleCustomerUpdated}/>}/>
        <Route path='/customers/list/' element={<CustomerList customers={customers} onEditCustomer={handleEditCustomer} onCustomerDeleted={handleCustomerDeleted}/>}/>
        <Route path='/orders/:id' element={< OrderForm selectedOrder={selectedOrder} onOrderUpdated={handleOrderUpdated}/>}/>
        <Route path='/orders/list/' element={<OrderList orders={orders} onEditOrder={handleEditOrder} onOrderDeleted={handleOrderDeleted}/>}/>
        <Route path="/products/:id" element={<ProductForm selectedProduct={selectedProduct} onProductUpdated={handleProductUpdated}/>}/>
        <Route path='/products/list/' element={<ProductList products={products} onEditProduct={handleEditProduct} onProductDeleted={handleProductDeleted}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
