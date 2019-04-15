import React from 'react'
import './index.scss'
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
            <div className='wrapper border relative'>
            <div className="box absolute">
                <h1 className='box_title'>Wall heaven</h1>
                <input
                    onKeyPress={e => this.toImglist(e)}  
                    onChange={this.setQ} 
                    value={this.state.q} 
                    className='box_input'/>
            </div>
        </div>
        )
    }
}

export default Main