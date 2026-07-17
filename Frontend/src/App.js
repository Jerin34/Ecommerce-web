import { BrowserRouter,Route,Routes} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import Register from "./pages/Register";
import Cart from './pages/Carts'
import Orders from './pages/Orders'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from "./pages/AdminProducts";
import AddProducts from "./pages/AddProducts";
import EditProductWrapper from "./wrappers/EditProductwrapper";
import ToastProvider from './components/Toast';
import ProductDetails from "./pages/ProductDetails";
const App = () =>(
    <> 
    <ToastProvider />
    <BrowserRouter>
    <Routes>
        <Route  path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route  path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route  path="/register" element={<PublicRoute><Register/></PublicRoute>} />
        <Route  path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
        <Route path="/carts" element = {<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path="/orders" element = {<ProtectedRoute><Orders/></ProtectedRoute>} />
        <Route path='/admin/dashboard' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
        <Route path='/admin/products' element={<ProtectedRoute><AdminProducts/></ProtectedRoute>}/>
        <Route path='/admin/add-product' element={<ProtectedRoute><AddProducts/></ProtectedRoute>}/>
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
        <Route path="/admin/edit-product/:id"element={<EditProductWrapper />}/>
        <Route path="*" element={<NotFound/>}/>

    </Routes>
    </BrowserRouter>
   
   </>        
)
export default App