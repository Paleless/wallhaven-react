import React from 'react'
import styles from './index.module.css'
import * as api from 'api'
class Wallpaper extends React.Component {
    state = {
        id: '',
        info: {
            img_src: '',
            related_tags: [],
            uploader: false
        }
    }

    componentWillMount() {
        const id = this.props.location.state.wallpaper_id
        if (!id) {
            //to404
        }
        api.getDetail(id)
            .then(res => {
                console.log(res)
                this.setState({
                    info: res,
                    id: id
                })
            })
    }
    render() {
        const { img_src, related_tags, uploader } = this.state.info
        return (
            <div className={styles.wrapper}>
                <figure>
                    <img className={styles.wallpaper} src={img_src} alt="img"/>
                </figure>
                <div className={styles.info}>
                    <span className={styles.author}>by: <strong>{uploader}</strong></span>
                        <a href={img_src} download={this.state.id}>
                            <button className={styles.btn_download}>download</button>
                        </a>
                </div>
                <div className="tag_warpper">

                </div>
            </div>
        )
    }
}
export default Wallpaper