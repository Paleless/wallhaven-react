import React from 'react'
import styles from './index.module.css'
import * as api from 'api/index.js'
// import history from 'utils/history.js'
import Header from './component/header/index.js'
class ImgList extends React.Component {
    state = {
        page_num: 1,
        search_condition: {
            q: '',
            topic: 'toplist',
            categories: [],
            page: 1,
            q: 'girl'
        },
        render_obj: {
            wallpapers: [],
            related_tags: [],
            total_page: 0
        }
    }

    getImageList = (option) => {
        api.search(this.state.search_condition)
            .then(res => {
                this.setState({
                    render_obj: res
                })
            })
    }


    componentWillMount() {
        this.getImageList()
        this.setState({
            q: this.props.location.state
        })
    }

    render() {
        const wallpapers = this.state.render_obj.wallpapers
        return (
            <div className={styles.wrapper}>
                <Header search={this.getImageList} custom_class={styles.header}/>
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

export default ImgList