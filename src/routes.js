import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login'
import Main from './pages/main'

function Routes () {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/main">
                    <Main />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes