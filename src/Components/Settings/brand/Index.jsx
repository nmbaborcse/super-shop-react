import React, { Component } from 'react'
import Api from '../../Api'
import Swal from 'sweetalert2'
import {NavLink} from 'react-router-dom'

export default class BrandList extends Component {

    state = {
        brands:[],
        input:{}
    }

    componentDidMount(){
        this.getData()
    }

    getData = () =>{
        Api().get('brand').then(res=>{
            console.log(res.data)
            this.setState({
                brands:res.data,
                process:false
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    inputHandle = (event) =>{
        this.setState({
            input:{
                ...this.state.input,
                [event.target.name]:event.target.value
            }
            
        })

        
    }
    submitHandler = (event)=>{
        event.preventDefault();
        this.setState({
            process:true
        })
        Api().post('brand',this.state.input).then(res=>{
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully Created.",
                timer:1000,
                showConfirmButton:false
              });
            this.setState({
                input:{
                    name:'',
                    status:1
                },
            })
            this.getCategory()
        }).catch(err=>{
            this.setState({
                process:false
            })
            console.log(err)
        })
    }

   
    deleteData(data,i){

        Api().delete('brand/'+data.id).then(res=>{
            
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully Deleted.",
                timer:1000,
                showConfirmButton:false
              });

            let brands = this.state.brands
            brands.splice(i,1)
            this.setState({
                brands:brands
            })
        }).catch(err=>{

            let code = err.response.data.message;
            if(code=='1451'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This data is used any where!',
                  })
            }
            console.log(err)
        })

        
    }
    render() {
        return (
            <>
            <div className="card mb-4">
                    <div className="card-header">
                    <b>Brand</b>
                    </div>
                    <div className="card-body">
                        <div className="col-md-12">
                        <form onSubmit={this.submitHandler}>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <input type="text" name="name" placeholder="Brand Name" value={this.state.input.name} className="form-control" onChange={this.inputHandle} />
                            </div>
                            <div className="col-md-2"><button type="submit" className="btn btn-primary"> {this.state.process && <i className="fa fa-spinner fa-spin"></i> }  Submit</button></div>
                        </div>
                        </form>
                        </div>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> SL </th>
                                    <th> Name </th>
                                    <th> Slug </th>
                                    <th> Status </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.brands.map((data,i)=>{
                                   return (
                                    <tr key={data.id}>
                                        <td>{i+1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.slug}</td>
                                        <td> {data.status==1?'Active':'Inactive'} </td>
                                        <td>
                                            <NavLink className="btn btn-xs btn-info" to="/brand/:id"> <i className="fa fa-edit"></i> </NavLink>

                                            <button className="btn btn-xs btn-danger" onClick={ () => this.deleteData(data,i)}> <i className="fa fa-trash"></i> </button>

                                        </td>
                                    </tr>
                                    )
                                })}
                                
                            </tbody>

                        </table>
                    </div>
                </div>
                
            </>
        )
    }
}
