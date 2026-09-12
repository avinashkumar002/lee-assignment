import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  )
}

export default App