import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import About from '../pages/About'
import AppRoute from './AppRoute'
export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" exact component={require('../Login').default} />

                <AppRoute path="/" exact component={require('../pages/Dashboard').default} />

                <AppRoute path="/about" exact component={About} />
                <AppRoute path="/blog" exact render={() => <div>Blog</div>}
                 />
                
            </Switch>
        )
    }
}
