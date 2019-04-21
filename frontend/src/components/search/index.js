import React from 'react'
import styles from './index.module.css'

/*
props:
    options
    enterHandler
    changeHandler
 */
export default class Search extends React.Component {
    state = {
        text: '',
        can_canel: false
    }

    changeHandler = (e) => {
        const value = e.target.value
        this.setState({
            text: value,
            can_canel: !(this.state.text === '')
        })
        if (this.props.changeHandler) {
            this.props.changeHandler(value)
        }
    }

    enterHandler = (e) => {
        if (e.key === 'Enter' && this.props.enterHandler) {
            this.props.enterHandler(this.state.text)
        }
    }

    clear = () => {
        this.setState({
            text: '',
            can_canel: false
        })
    }


    render() {
        return (
            <div className={[styles.wrapper, this.props.custom_class||''].join(' ')}>
                <input 
                    placeholder={this.props.placeholder}
                    value={this.state.text}
                    onChange={this.changeHandler}
                    onKeyPress={this.enterHandler} 
                    className={styles.search} type="text"/>
                <i  
                    onClick={this.clear}
                    className={[styles.cancel, this.state.can_canel?styles.cancel_active:''].join(' ')}/>
            </div>
        )
    }
}