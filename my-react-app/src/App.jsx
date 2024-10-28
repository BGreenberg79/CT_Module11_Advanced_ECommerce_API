import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";


function App() {

  return (
    <>
    <NavBar/>
      <h1>E-Commerce API</h1>

      <Routes>
        <Route path="/" element={< Home />}/>
        <Route path="/customer/:id" element={< CustomerForm />}/>
        <Route path='/customer/list/' element={<CustomerList/>}/>
        <Route path='/order/:id' element={< OrderForm/>}/>
        <Route path='/order/list/' element={<OrderList/>}/>
        <Route path="/product/:id" element={<ProductForm/>}/>
        <Route path='/product/list/' element={<ProductList/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
