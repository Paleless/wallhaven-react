import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
import Header from './component/header/index.js'
import { connect } from 'react-redux'
import { APPEND_WALLPAPERS, SET_WALLPAPERS, SET_OPTION } from '../../store/wallpaper.js'

function mapStateToProps(state) {
    return {
        wallpaper: state.wallpaper,
        queryOption: state.queryOption
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        setImageList(options) {
            api.search(options)
                .then(res => {
                    dispatch({ type: SET_WALLPAPERS, payload: res })
                })
        },
        setOption(obj_part) {
            dispatch({ type: SET_OPTION, payload: obj_part })
        }
    }
}
class ImgList extends React.Component {
    state = {
        page_num: 1,
    }

    componentWillMount() {
        this.props.setImageList(this.props.queryOption)
        this.props.setOption({ q: this.props.location.state })
    }

    render() {
        const wallpapers = this.props.wallpaper.wallpapers || []
        return (
            <div className={styles.wrapper}>
                <Header custom_class={styles.header}/>
                <div>
                    <ul className='flex flex-wrap justify-around'>
                        {wallpapers.map(({preview_src, wallpaer_id, res})=>
                            (<li key={preview_src} className={styles.preview}>
                                <figure className='relative'>
                                    <img className={styles.preview_img} alt={wallpaer_id} src={preview_src}/>
                                    <span className={styles.preview_res}>{res}</span>
                                </figure>
                            </li>))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgList)