import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
import Menu from 'components/menu/index.js'
import Search from 'components/search/index.js'
import MultipleCheckbox from 'components/multiple_checkbox/index.js'
import DropDown from 'components/dropdown/index.js'
import { SET_OPTION, SET_WALLPAPERS } from '../../../../store/wallpaper.js'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        queryOption: state.queryOption
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setWallPapers(options) {
            api.search(options)
                .then(res => {
                    dispatch({ type: SET_WALLPAPERS, payload: res })
                })
        },
        setQueryOption(option_part) {
            dispatch({ type: SET_OPTION, payload: option_part })
        }
    }
}

class Header extends React.Component {
    state = {
        topics: [],
        cat: [],
        sorting: []
    }

    componentWillMount() {
        this.fillOptions()
    }

    fillOptions = () => {
        const normalize = xs => xs.map(v => ({ label: v, value: v, activited: true }))
        const options = { topics: api.getTopics, cat: api.getCat, sorting: api.getSorting }
        Promise
            .all(Object.entries(options).map(([key, fn]) =>
                fn().then(res => ({
                    [key]: normalize(res)
                }))
            ))
            .then(values => {
                const tempState = values.reduce((accu, obj) => ({ ...accu, ...obj }), {})
                this.setState({
                    ...tempState
                })
            })
    }


    catSelectHandler = (v) => {
        this.props.setQueryOption({ categories: v })
    }

    dropdownSelectHandler = (v) => {
        this.props.setQueryOption({ sorting: v })
    }

    onMenuClick = (v) => {
        this.props.setQueryOption({ topic: v, q: '' })
        this.search()
    }


    setQ = (text) => {
        this.props.setQueryOption({ q: text })
    }

    search = () => {
        const { queryOption, setQueryOption } = this.props
        setQueryOption({ page: 1 })
        this.props.setWallPapers({ ...queryOption, page: 1 })
    }

    render() {
        const { topics, cat, sorting } = this.state
        return (
            <header className={[styles.header, this.props.custom_class||''].join(' ')}>
                <Menu custom_class={styles.menu} onMenuClick={this.onMenuClick} menu_items={topics}/>
                <MultipleCheckbox custom_class={styles.mul} onSelect={this.catSelectHandler} options={cat} />
                <DropDown custom_class={styles.dropdown} selectHandler={this.dropdownSelectHandler} options={sorting}/>
                <div className={styles.search}>
                    <Search placeholder="" changeHandler={this.setQ} enterHandler={this.search}/>
                    <button onClick={this.search} className={styles.refresh_btn}>search</button>
                </div>
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)