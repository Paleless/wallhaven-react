import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
// import history from 'utils/history.js'
// import Header from './component/header/index.js'
class ImgList extends React.Component {
    state = {
        q: '',
        topics: [],
        cat: [],
        sorting: [],
        page_num: 1,
        img_list: []
    }

    getImageList() {
        api.search({})
            .then(res => {
                this.setState({
                    img_list: res.data
                })
            })
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
        this.getImageList()
        this.setState({
            q: this.props.location.state
        })
    }

    render() {
        return (
            <div className={[styles.wrapper,"border"].join(' ')}>
                <nav>
                    
                </nav>
                <div>
                    <ul>
                        {this.state.img_list.map(({preview_src, id})=>
                            <img key={id} alt={id} src={preview_src}/>)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ImgList