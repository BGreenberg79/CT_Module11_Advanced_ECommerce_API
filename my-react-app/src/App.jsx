import OrderForm from "./OrderForm"
import ProductForm from "./ProductForm"


function App() {

  return (
    <>
    <NavBar/>
      <h1>E-Commerce API</h1>

      <Routes>
        <Route path="/" element={< Home />}/>
        <Route path="/customer/:id" element={< CustomerForm />}/>
        <Route path='/order/:id' element={< OrderForm/>}/>
        <Route path="/product/:id" element={<ProductForm/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
