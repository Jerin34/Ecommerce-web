import { BrowserRouter,Route,Routes} from "react-router-dom";
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import Register from "./pages/Register";
const App = () =>(
    <BrowserRouter>
    <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/register" element={<Register/>} />
        <Route  path="/products" element={<Products/>} />
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
 
)
export default App