import React, { Component } from 'react'
import Api from '../Api'

export default class Category extends Component {

    state = {
        category : []
    }

    componentDidMount(){
        this.getCategory()
    }

    getCategory = () =>{
        Api().get('category').then(res=>{
            this.setState({
                category:res.data
            })
            console.log(this.state.category)
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
                    <a className="btn btn-xs btn-success pull-right"><i className="fa fa-plus"></i> Add New</a>
                    </div>
                    <div className="card-body">
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
                                        <td>{data.name}</td>
                                        <td>{data.slug}</td>
                                        <td> {data.status==1?'Active':'Inactive'} </td>
                                        <td></td>
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
