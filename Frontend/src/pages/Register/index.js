import {Component} from 'react';
import './index.css';
class Register extends Component{
    state={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        errMsg:'',
        showPassword:false,
    }
    onChangeName = (e)=>{
        this.setState({name:e.target.value})
    }
    onChangeEmail = (e)=>{
        this.setState({email:e.target.value})
    }
    onChangeShowPassword = (e) =>{
        this.setState({ showPassword:e.target.checked})
    }
    onChangePassword = (e)=>{
        this.setState({password:e.target.value})
    }
    onChangeConfirmPassword = (e)=>{
        this.setState({confirmPassword:e.target.value})
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password, confirmPassword} = this.state
        if(!name || !email || !password || !confirmPassword){
            this.setState({errMsg: 'All fields must be filled'})
            return
        } else if(password !== confirmPassword){
            this.setState({errMsg: 'Passwords do not match'})
            return 
        } 
            this.setState({errMsg: ''})
        console.log('Form Submitted');
        
     
        
    }
    render(){
        const {name,email,password,confirmPassword,errMsg} = this.state
        return (
            <div className='container'>
                <h1 className='heading'>Register here...</h1>
                <div className='form-container'>
                    <form className="form" onSubmit={this.onSubmit}>
                        <label htmlFor='name'>Name: </label>
                        <input type='text' id='name' placeholder='Enter your name' value={name} onChange={this.onChangeName} /><br/><br/>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' id="email" placeholder='Enter your Mail id' value={email} onChange={this.onChangeEmail}/><br/><br/>
                        <label htmlFor='password'>Password: </label>
                        <input type={this.state.showPassword ?'text' : 'password'} id='password' placeholder='Enter your password' value={password} onChange={this.onChangePassword}/><br/><br/>
                        <label htmlFor='confirmPassword'>Confirm Password: </label>
                        <input type={this.state.showPassword ?'text' : 'password'} id='confirmPassword' placeholder='Confirm your password' value={confirmPassword} onChange={this.onChangeConfirmPassword}/><br/><br/>
                        <label htmlFor='showPassword'>Show Password</label>
                        <input type='checkbox' id='showPassword' checked={this.state.showPassword} onChange={this.onChangeShowPassword}/>
                        <button className='btn' type='submit'>Register</button>
                        {this.state.errMsg && <p style={{color:'red'}}>{errMsg}</p>}
                    </form>

                </div>
            </div>
        )
    }
}
export default Register;