import React, { Component } from 'react'
import Axios from 'axios'

export default class Login extends Component {
    state = {
        input:{
            email:'',
            password:''
        },
        error:''
        
    }
    componentDidMount(){
        let token = localStorage.getItem('token')
        if(token!=null){
            this.props.history.push('/')
        }
        
    }

    chageHandler = (e) =>{
        this.setState({
            input:{
                ...this.state.input,
                [e.target.name]:e.target.value
            },
            error:''
        })
    }

    submitHandler = (e) =>{
        e.preventDefault();

        Axios.post('http://localhost:8000/api/login',this.state.input).then(res=>{

            let user = res.data
            localStorage.setItem('token',user.token)
            localStorage.setItem('id',user.id)
            localStorage.setItem('name',user.name)
            localStorage.setItem('email',user.email)
            window.location.replace('/')
            //this.props.history('/')
        }).catch(err=>{
            this.setState({
                error:'Username/Password not mathed!'
            })
        })
    }



    render() {
        return (
            <>
        <div className="container">
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4"> My Shop </h1>
                                        </div>
                                        <form className="user" onSubmit={this.submitHandler}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp" required
                                                    placeholder="Enter Email Address..." name="email" onChange={this.chageHandler} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" required
                                                    id="exampleInputPassword" placeholder="Password" name="password" onChange={this.chageHandler} />
                                                    {this.state.error && <p className="text-danger text-center"> {this.state.error} </p> }
                                                    
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    <label className="custom-control-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <button  className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            </div>
            </>
        )
    }
}
