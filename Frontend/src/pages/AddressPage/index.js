import {Component} from 'react'
import AddressCard from '../AddressCard'
import { showToast } from '../../components/Toast'
import AddressForm from '../AddressForm'
import Header from '../Header'
import './index.css'
class AddressPage extends Component{
    state ={
        addresses:[],
        loading:true,
        showAddressform:false,
        editingAddress:null,
        errorMsg:''
    }
    componentDidMount(){
        this.fetchAddress()
    }
    onEdit = address =>{
        console.log(address)
        this.setState({
            showAddressform:true,
            editingAddress:address
        })
    }
    closeForm = () => {
    this.setState({
        showAddressform: false,
        editingAddress: null
    });
}
openForm = () =>{
    this.setState({
        showAddressform: true,
        editingAddress: null
    })
}
    onDelete = async id =>{
            try{
        const token = localStorage.getItem('jwt_token')
        if(!token){
            this.setState({errorMsg:'Please Login First', loading:false})
            showToast('error','Please Login First')
            return ;
        }
        const url =`${process.env.REACT_APP_API_URL}/api/address/${id}`
        const options={
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
        const response  = await fetch(url,options)
        const data = await response.json()
        if(response.ok){
            showToast('success',data.message)
            this.fetchAddress()
        }
        else{
            showToast('error',data.message)
        }
    }
    catch(err){
        this.setState({errorMsg:err.message,loading:false})
    }
    }
    onMakeDefault = async id => {
    try {
        const token = localStorage.getItem("jwt_token");

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/address/${id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {
            showToast("success", data.message);
            this.fetchAddress();
        } else {
            showToast("error", data.message);
        }
    } catch (err) {
        showToast("error", err.message);
    }
};
    fetchAddress = async() =>{
        try{
        const token = localStorage.getItem('jwt_token')
        if(!token){
            this.setState({errorMsg:'Please Login First',loading:false})
            return ;
        }
        const url = `${process.env.REACT_APP_API_URL}/api/address`
        const options={
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok){
            this.setState({addresses:data.addresses,loading:false})
        }else{
            this.setState({errorMsg:data.message,loading:false})
        }
    }
    catch(err){
        this.setState({errorMsg:err.message,loading:false})
    }
    }
   render() {
    const { addresses, loading, errorMsg,showAddressform,editingAddress } = this.state;

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (errorMsg) {
        return <h1>{errorMsg}</h1>;
    }

    return (
        <div className="address-page">
            <Header />
            <h1>My Addresses</h1>

            <button type="button" onClick={this.openForm}>
                Add New Address
            </button>
            {showAddressform && (
                <AddressForm
                    fetchAddress={this.fetchAddress}
                    closeForm={this.closeForm}
                    editingAddress={editingAddress}
                />
            )}
{
    addresses.map((address) => (
        <AddressCard key={address._id} address={address} onEdit={this.onEdit} onDelete={this.onDelete} onMakeDefault={this.onMakeDefault} />
    ))
}
        </div>
    );
}
}
export default AddressPage