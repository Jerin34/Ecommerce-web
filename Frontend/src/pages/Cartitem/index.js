import { showToast } from '../../components/Toast';
import './index.css'

const Cartitem = props =>{
    const {cartItem,removeCartItem, refreshCarts} = props;
    const {product,quantity} = cartItem
   const  onDeleteItem = async id =>{
        const token = localStorage.getItem('jwt_token');
        const url = `${process.env.REACT_APP_API_URL}/api/cart/${id}`;
        const options = {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }
        try {
const response = await fetch(url,options);
        if(response.ok){
        removeCartItem(id);
        }
        else{
            showToast("Failed to remove item");
        }
        } catch (error) {
            showToast("Cant Remove item");
        }
        
    }
    const increaseQuantity = async (id,action) =>{
       
        const token = localStorage.getItem('jwt_token');
        const url = `${process.env.REACT_APP_API_URL}/api/cart/${id}`;
        const options = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
                
            },
            body:JSON.stringify({action})
        }
        try {
            const response = await fetch(url,options);
            if(response.ok){
                refreshCarts();
            }
            else{
                showToast("Failed to add item")
            }
            }

    catch(e){
        showToast(e.message);
    }
}
 const decreaseQuantity = async (id,action) =>{
        const token = localStorage.getItem('jwt_token');
        const url = `${process.env.REACT_APP_API_URL}/api/cart/${id}`;
        const options = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
                
            },
            body:JSON.stringify({action})
        } 
        try {
            const response = await fetch(url,options);
            if(response.ok){
                refreshCarts();
            }
            else{
                showToast("Failed to remove item")
            }
            }

    catch(e){
        showToast(e.message)
    }
}
    return(
        <li className="cart-item">
        <div className="container">
            <img src={product.imageUrl} alt={product.name}/>
            <div className="item-data">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <div>
                    <button className="add" onClick={() => increaseQuantity(cartItem._id,"increase")} >+</button>
                <p>Quantity: {quantity}</p>
                <button className="minus" onClick={() => decreaseQuantity(cartItem._id,"decrease")}>-</button>
                </div>               
            </div>
            <button className="btn" onClick={() => onDeleteItem(cartItem._id)}>Remove</button>
        </div>
        </li>
    )
}
export default Cartitem