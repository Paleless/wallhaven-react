import React from 'react'
import styles from './index.module.css'
import MultipleCheckbox from 'components/multiple_checkbox/index.js'
import DropDown from 'components/dropdown/index.js'
export default class OptionBar extends React.Component {
    state = {
        options: [{
            label: 'test',
            value: 3,
            activited: true
        }, {
            label: 'test2',
            value: 4
        }],
        options2: [{
            label: 'test',
            value: 'hello'
        }, {
            label: 'test',
            value: 3,
            activited: true
        }, {
            label: 'test2',
            value: 4
        }]
    }

    selectHanlder = (v) => {
        console.log(v)
    }
    dropdownSelectHandler = (v) => {
        console.log(v)
    }
    render() {
        const { options } = this.state
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper_left}>
                    <MultipleCheckbox onSelect={this.selectHanlder} options={options} />
                    <DropDown custom_class='ml2' selectHanlder={this.dropdownSelectHandler} options={this.state.options2}/>
                </div>
               
            </div>
        )
    }
}