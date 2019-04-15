import React from 'react'
import styles from './index.scss'
import history from 'utils/history.js'
import * as api from 'api/index.js'
import Header from './component/header/index.js'
console.log(styles)
class ImgList extends React.Component {
    state = {
        q: '',
        topics: [],
        cat: [],
        sorting: [],
        page_num: 1,
        img_list: []
    }

    componentWillMount() {
        api.getTopics()
            .then((res) => {
                this.setState({
                    topics: res
                })
            })
        api.getSorting()
            .then((res) => {
                this.setState({
                    sorting: res
                })
            })
        api.getCat()
            .then((res) => {
                this.setState({
                    cat: res
                })
            })
        this.setState({
            q: this.props.location.state
        })
    }

    render() {
        return (
            <div className="wrapper">
                <Header></Header>
                <h1>img list</h1>
            </div>
        )
    }
}

export default ImgList