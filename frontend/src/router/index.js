import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history.js'
import Home from 'pages/home/index.js'
import ImgList from 'pages/img_list/index.js'
import ImgDetail from 'pages/img_detail/index.js'

const router = () => {
    return (
        <Router history={history}>
            <Switch>             
                <Route exact path="/" component={Home}/>
                <Route path="/list" component={ImgList}/>
                <Route path="/wallpaper" component={ImgDetail}/>
            </Switch>
        </Router>
    )
}

export default router