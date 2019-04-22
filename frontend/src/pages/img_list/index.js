import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
import Header from './component/header/index.js'
import { connect } from 'react-redux'
import { APPEND_WALLPAPERS, SET_WALLPAPERS, SET_OPTION } from '../../store/wallpaper.js'
import { debounce } from 'utils/tool.js'

function mapStateToProps(state) {
    return {
        wallpaper: state.wallpaper,
        queryOption: state.queryOption,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        setImageList: (options) =>
            api
            .search(options)
            .then(res =>
                dispatch({ type: SET_WALLPAPERS, payload: res })
            ),
        appendImageList: (options) =>
            api
            .search(options)
            .then(res =>
                res.wallpapers.length === 0 ?
                Promise.reject() :
                dispatch({ type: APPEND_WALLPAPERS, payload: res })
            ),
        setOption: (obj_part) =>
            dispatch({ type: SET_OPTION, payload: obj_part })
    }
}
class ImgList extends React.Component {
    state = {
        container: React.createRef()
    }

    componentWillMount() {
        this.props.setOption({ q: this.props.location.state.q })
        this.props.setImageList(this.props.queryOption)
    }

    componentDidMount() {
        const container = this.state.container.current
        const { setOption, appendImageList } = this.props
        const scrollHandler = (e) => {
            const h = window.scrollY + window.innerHeight
            if (h > container.offsetHeight) {
                const { queryOption } = this.props
                setOption({ page: queryOption.page + 1 })
                appendImageList({ ...queryOption, page: queryOption.page + 1 })
                    .catch(() => {
                        console.log('catched')
                        setOption(queryOption)
                    })
            }
        }
        document.addEventListener('scroll', debounce(scrollHandler))
    }

    toImg = (wallpaper_id) => {
        const history = this.props.history
        history.push('wallpaper', {wallpaper_id})
    }

    render() {
        const wallpapers = this.props.wallpaper.wallpapers || []
        return (
            <div className={styles.wrapper}>
                <Header custom_class={styles.header}/>
                <div>
                    <ul ref={this.state.container} className={styles.container}>
                        {wallpapers.map(({preview_src, wallpaper_id, res})=>
                            (<li onClick={()=>this.toImg(wallpaper_id)} key={preview_src} className={styles.preview}>
                                <figure className='relative'>
                                    <img className={styles.preview_img} alt={wallpaper_id} src={preview_src}/>
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