import React, { Component } from 'react'
import Api from '../Api'
import Swal from 'sweetalert2'
import {NavLink} from 'react-router-dom'

export default class SubCategory extends Component {

    state = {
        category_id:this.props.match.params.id,
        category:{},
        subCategory : [],
        input:{
            name:'',
            status:1,
            category_id:this.props.match.params.id
        },
        process:false,
        editable:{
            id:'',
            i:'',
            name:''
        }
    }

    componentDidMount(){

        this.getSubCategory()
    }

    getSubCategory = () =>{
        Api().get('sub-category?category_id='+this.state.category_id).then(res=>{
            
            this.setState({
                subCategory:res.data.allData,
                category:res.data.category,
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
        Api().post('sub-category',this.state.input).then(res=>{
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
            this.getSubCategory()
        }).catch(err=>{
            this.setState({
                process:false
            })
            console.log(err)
        })
    }


    editButton(data,i){
        this.setState({
            editable:{
                i:i,
                id:data.id,
                name:data.name
            }
        })
    }

    editChange = (e) => {
        
        this.setState({
            editable:{
                ...this.state.editable,
                name:e.target.value
            }
        })
    
    }

    editSubmit = (e) =>{
        e.preventDefault();

        Api().put('sub-category/'+this.state.editable.id,this.state.editable).then(res=>{
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully Updated.",
                timer:1000,
                showConfirmButton:false
              });
              this.setState({
                  editable:{
                      i:'',
                      id:'',
                      name:''
                  }
              })
              this.getSubCategory();

        }).catch(err=>{
            console.log(err)
        })
    }
    
    deleteCategory(data,i){

        Api().delete('sub-category/'+data.id).then(res=>{
            
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully Deleted.",
                timer:1000,
                showConfirmButton:false
              });

            let subCategory = this.state.subCategory
            subCategory.splice(i,1)
            this.setState({
                subCategory:subCategory
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
                    <b>Sub Category of {this.state.category.name} </b>
                    <NavLink className="btn btn-success pull-right" to="/category"> All Category </NavLink>
                    </div>
                    <div className="card-body">
                        <div className="col-md-12">
                        <form onSubmit={this.submitHandler}>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <input type="text" name="name" placeholder="Sub Category Name" value={this.state.input.name} className="form-control" onChange={this.inputHandle} />
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
                                {this.state.subCategory.map((data,i)=>{
                                   return (
                                    <tr key={data.id}>
                                        <td>{i+1}</td>
                                        <td>
                                            {
                                                (this.state.editable.i === i) ?
                                                <form onSubmit={this.editSubmit}>
                                                    <div className="form-group row">
                                                        <div className="col-md-8">
                                                            <input className="form-control" type="text" value={this.state.editable.name} onChange={this.editChange} name="name" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <button className="btn btn-success">Save</button>
                                                        </div>
                                                    </div>
                                                </form>

                                                :
                                                (
                                                    <span> {data.name}  </span>
                                                )
                                            }
                                            

                                            
                                            </td>
                                        <td>{data.slug}</td>
                                        <td> {data.status==1?'Active':'Inactive'} </td>
                                        <td>
                                            <button className="btn btn-xs btn-info" onClick={ () => this.editButton(data,i)}> <i className="fa fa-edit"></i> </button>

                                            <button className="btn btn-xs btn-danger" onClick={ () => this.deleteCategory(data,i)}> <i className="fa fa-trash"></i> </button>

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
