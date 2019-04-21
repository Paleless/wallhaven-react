import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
import Menu from 'components/menu/index.js'
import Search from 'components/search/index.js'
import MultipleCheckbox from 'components/multiple_checkbox/index.js'
import DropDown from 'components/dropdown/index.js'
class Header extends React.Component {
    state = {
        topics: [],
        cat: [],
        sorting: []
    }

    fillOptions = () => {
        const normalize = xs => xs.map(v => ({ label: v, value: v }))
        api.getTopics()
            .then((res) => {
                this.setState({
                    topics: res
                })
            })
        api.getSorting()
            .then((res) => {
                this.setState({
                    sorting: normalize(res)
                })
            })
        api.getCat()
            .then((res) => {
                this.setState({
                    cat: normalize(res)
                })
            })
    }


    catSelectHandler = (v) => {
        console.log(v)
    }

    dropdownSelectHandler = (v) => {
        console.log(v)
    }

    onMenuClick = (v) => {
        console.log(v)
    }

    componentWillMount() {
        this.fillOptions()
    }

    render() {
        const menu_items = this.state.topics.map(v => ({ label: v, value: v }))
        return (
            <header className={[styles.header, this.props.custom_class||''].join(' ')}>
                <Menu onMenuClick={this.onMenuClick} menu_items={menu_items}/>
                <MultipleCheckbox onSelect={this.catSelectHandler} options={this.state.cat} />
                <DropDown custom_class='ml2' selectHanlder={this.dropdownSelectHandler} options={this.state.sorting}/>
                <div className='flex'>
                    <Search className={styles.search}/>
                    <button className={styles.refresh_btn}>search</button>
                </div>
            </header>
        )
    }
}

export default Header