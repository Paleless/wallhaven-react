import React from 'react'
import styles from './index.module.css'
export default class Menu extends React.Component {
    state = {
        active_index: 0
    }

    onMenuClick = (value, index) => {
        this.setState({
            active_index: index
        })
        if (this.props.onMenuClick) {
            this.props.onMenuClick(value)
        }
    }


    render() {
        //munu_items::[{label, value}]
        const menu_items = this.props.menu_items || []
        const active_index = this.state.active_index
        return (
            <ul className={styles.menu}>
                {menu_items.map(({label, value}, index)=>(
                    <li onClick={()=>this.onMenuClick(value, index)} className={[
                        styles.menu_item, 
                        active_index===index?styles.menu_item_active:""
                    ].join(' ')} key={value}>{label}</li>))}
            </ul>
        )
    }
}