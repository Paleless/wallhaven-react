import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
import Menu from 'components/menu/index.js'
import Search from 'components/search/index.js'
class Header extends React.Component {
    state = {
        topics: [],
        cat: [],
        sorting: [],
    }

    fillOptions = () => {
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
    }

    onMenuClick = (v) =>{
        console.log(v)
    }

    componentWillMount() {
        this.fillOptions()
    }

    render() {
        const menu_items = this.state.topics.map(v => ({ label: v, value: v }))
        return (
            <header className={styles.header}>
                <Menu onMenuClick={this.onMenuClick} menu_items={menu_items}/>
                <Search className={styles.search}/>
            </header>
        )
    }
}

export default Header