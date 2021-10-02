import React, { Component } from 'react'
import Header from '../_partials/Header'
import Sidebar from '../_partials/Sidebar'
export default class MainLayout extends Component {
    render() {
        return (
            <>
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                <Header />
                    <div className="container-fluid">
                    
                    {this.props.children}

                    </div>
                </div>
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Shop 2021</span>
                        </div>
                    </div>
                </footer>
            </div> 
            </>
        )
    }
}
