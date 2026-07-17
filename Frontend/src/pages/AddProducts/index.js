import {Component} from 'react';
import { showToast } from '../../components/Toast';
import './index.css';
class AddProducts extends Component{
    state={
        name:'',
        description:'',
        category:'',
        imageUrl:'',
        price:'',
        stock:'',
        errorMsg:'',
    }
    onChangeName = (e) => {
    this.setState({name: e.target.value})
}

onChangeDescription = (e) => {
    this.setState({description: e.target.value})
}

onChangeCategory = (e) => {
    this.setState({category: e.target.value})
}

onChangeImageUrl = (e) => {
    this.setState({imageUrl: e.target.value})
}

onChangePrice = (e) => {
    this.setState({price: e.target.value})
}

onChangeStock = (e) => {
    this.setState({stock: e.target.value})
}
FormSuccess = () => {
    window.location.replace('/admin/products')
}
formSubmit = async (e) =>{
    e.preventDefault();
     const {name,description,category,imageUrl,price,stock} = this.state;
     const productDetails = {name,description,category,imageUrl,price:Number(price),stock:Number(stock)};
    if (!name ||!description ||!category ||!imageUrl ||!price ||!stock) {
    this.setState({
        errorMsg: 'Please fill all fields'
    });
    showToast('Please fill all fields', 'error');
    return;
}
    const token  = localStorage.getItem('jwt_token');
    const url = 'http://localhost:5000/api/products';
    const options = {
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productDetails)

    }
    const response = await fetch(url,options);
    const data = await response.json();
    if(response.ok === true){
        showToast(data.message, 'success');
        this.FormSuccess();
        this.setState({name:'',description:'',category:'',imageUrl:'',price:'',stock:'',errorMsg:''})
    }else{
        this.setState({errorMsg:data.message});
        showToast(data.message, 'error');
    }
}
    render(){
        return(
            <>
            <div className="add-product-container">
                <h1>Add Products</h1>
                <form onSubmit={this.formSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder='Enter Name' value={this.state.name} onChange={this.onChangeName}/>

                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' placeholder='Enter Description' value={this.state.description} onChange={this.onChangeDescription}/>

                    <label htmlFor='category'>Category</label>
                    <input type='text' id='category' placeholder='Enter Category' value={this.state.category} onChange={this.onChangeCategory}/>

                    <label htmlFor='image'>Image Url</label>
                    <input type='url' id='image' placeholder='Enter Image Url' value={this.state.imageUrl} onChange={this.onChangeImageUrl}/>

                    <label htmlFor='price'>Price</label>
                    <input type='number' id='price' placeholder='Enter Price' value={this.state.price} onChange={this.onChangePrice}/>

                    <label htmlFor='stock'>Stock</label>
                    <input type='number' id='stock' placeholder='Enter Stock' value={this.state.stock} onChange={this.onChangeStock}/>

                    <button type='submit' className="btn">Add Product</button>
                    {this.state.errorMsg &&(
                        <p className="err-msg">{this.state.errorMsg}</p>
                    )}
                </form>
            </div>
            </>
        )
    }
}
export default AddProducts;