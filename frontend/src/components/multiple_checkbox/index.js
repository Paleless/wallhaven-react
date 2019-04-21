import React from 'react'
import styles from './index.module.css'
/*
props:
    options::[{label, value, activited}]
    onSelect::event -> selected_list
 */
export default class MultipleCheckbox extends React.Component {
    state = {
        options: []
    }

    componentWillMount() {
        console.log('child rendered',this.props.options)
        this.setState({
            options: this.props.options
        })
    }

    onSelect = (i) => {
        const temp_options = this.state.options 
        temp_options[i].activited = !temp_options[i].activited
        this.setState({
            options: temp_options
        })
        if (this.props.onSelect) {
            const selected = this.state.options
                .filter(option => option.activited)
                .map(option => option.value)
            this.props.onSelect(selected)
        }
    }

    render() {
        const options = this.state.options
        return (
            <ul className={[styles.wrapper, this.props.custom_class||''].join(' ')}>
                {options.map(({label, value, activited}, index) => (
                    <li key={value} className={[styles.box, activited?styles.box_active:''].join(' ')} onClick={() =>this.onSelect(index)}>{label}</li>))}
            </ul>
        )
    }
}