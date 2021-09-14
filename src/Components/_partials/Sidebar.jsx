import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class Sidebar extends Component {
    state = {
        toggle:''
    }

    toggleChange = ()=>{
        if(this.state.toggle==''){
            this.setState({
                toggle:'toggled'
            })
        }else{
            this.setState({
                toggle:''
            })
        }
    }

    render() {
        return (
            <>
            <ul className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion "+this.state.toggle} id="accordionSidebar">

                {/* Sidebar - Brand */}
                <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">My Shop </div>
                </NavLink>

                {/* Divider */}
                <hr className="sidebar-divider my-0" />

                {/* Nav Item - Dashboard */}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>About</span></NavLink>
                </li>
                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                        <NavLink className="collapse-item" to="/category">Category </NavLink>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={this.toggleChange}></button>
                </div>

                </ul>
                
            </>
        )
    }
}
