import React, { Component } from 'react'
import Api from '../Api'
import Swal from 'sweetalert2'

export default class Category extends Component {

    state = {
        category : [],
        input:{
            name:'',
            status:1
        },
        process:false,
        editable:{
            id:'',
            i:'',
            name:''
        }
    }

    componentDidMount(){
        this.getCategory()
    }

    getCategory = () =>{
        Api().get('category').then(res=>{
            this.setState({
                category:res.data,
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
        Api().post('category',this.state.input).then(res=>{
            Swal.fire({
                type: "success",
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

        Api().put('category/'+this.state.editable.id,this.state.editable).then(res=>{
            Swal.fire({
                type: "success",
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
              this.getCategory();

        }).catch(err=>{
            console.log(err)
        })
    }
    
    deleteCategory(data,i){

        Api().delete('category/'+data.id).then(res=>{
            
            Swal.fire({
                type: "success",
                title: "Success",
                text: "Successfully Deleted.",
                timer:1000,
                showConfirmButton:false
              });

            let category = this.state.category
            category.splice(i,1)
            this.setState({
                category:category
            })
        }).catch(err=>{
            console.log(err)
        })

        
    }
    render() {
        return (
            <>
                <div className="card mb-4">
                    <div className="card-header">
                    <b>Category</b>
                    </div>
                    <div className="card-body">
                        <div className="col-md-12">
                        <form onSubmit={this.submitHandler}>
                        <div className="form-group row">
                            <div className="col-md-6">
                                <input type="text" name="name" placeholder="Category Name" value={this.state.input.name} className="form-control" onChange={this.inputHandle} />
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
                                {this.state.category.map((data,i)=>{
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
