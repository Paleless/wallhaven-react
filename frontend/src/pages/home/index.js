import React from 'react'
import styles from './index.module.css'
import history from 'utils/history.js'
class Main extends React.Component {
    state = {
        q: 'hello'
    }

    toImglist = (e) => {
        const is_enter = e.key === 'Enter'
        if (is_enter) {
            history.push('list', { q: this.state.q })
        }
    }

    setQ = (e) => {
        this.setState({
            q: e.target.value
        })
    }

    render() {
        return (
            <div className={styles.wrapper}>
            <div className={styles.box}>
                <h1 className={styles.box_title}>Wall heaven</h1>
                <input
                    onKeyPress={e => this.toImglist(e)}  
                    onChange={this.setQ} 
                    value={this.state.q} 
                    className={styles.box_input}/>
            </div>
        </div>
        )
    }
}

export default Main