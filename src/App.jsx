import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductTable from "./pages/ProductTable";
import ProductDetails from "./pages/ProductDetails";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ProductTable />} />
          <Route path='/details/:id' element={<ProductDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App