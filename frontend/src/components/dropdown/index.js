import React from 'react'
import styles from './index.module.css'

/*
props:
    options::[{label, value}]
    selectHandler::event
 */
export default class DropDown extends React.Component {
    state = {
        activited: undefined,
        options: [],
        visible: false
    }

    componentWillMount() {
        this.setState({
            options: this.props.options || []
        })
    }

    toggleVisible = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    setActivited = (option) => {
        this.toggleVisible()
        this.setState({
            activited: option.label
        })
        if(this.props.selectHandler){
            this.props.selectHandler(option.value)
        }
    }

    render() {
        const options = this.state.options
        const visible = this.state.visible
        return (
            <div className={[styles.wrapper, this.props.custom_class||''].join(' ')}>
                <div onClick={this.toggleVisible} className={styles.chosed_box}>{this.state.activited||'select'}</div>
                <ul className={[styles.option_wrapper, visible?styles.option_wrapper_active:''].join(' ')}>
                    {options.map(option=>(
                        <li onClick={()=>this.setActivited(option)} key={option.value} className={styles.option_box}>{option.label}</li>))}
                </ul>
            </div>
        )
    }
}