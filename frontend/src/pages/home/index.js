import React from 'react'
import styles from './index.module.css'
import history from 'utils/history.js'

function setBg() {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const ENV = {
        width: window.innerWidth,
        height: window.innerHeight,
        hue: 0,
        pixs: []
    }

    function random(a, b) {
        return Math.random() * (b - a) + a
    }

    class Pix {
        constructor() {
            this.x = random(0, ENV.width)
            this.y = random(0, 20)
            this.vx = random(0, 1)
            this.vy = random(0, 1)
            this.r = 2
        }

        update() {
            this.x += this.vx
            this.y += this.vy
            if ((this.x + this.r) > ENV.width) {
                this.vx = -this.vx
                this.x += this.vx
            } else if ((this.x - this.r) < 0) {
                this.vx = -this.vx
                this.x += this.vx
            }
            if ((this.y + this.r) > ENV.height) {
                this.vy = -this.vy
                this.y += this.vy
            } else if ((this.y - this.r) < 0) {
                this.vy = -this.vy
                this.y += this.vy
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
            ctx.fillStyle = "#fff";
            ctx.fill()
            this.update()
        }
    }

    function init() {
        canvas.width = ENV.width
        canvas.height = ENV.height
        ENV.pixs = Array(30).fill(null).map(_ => new Pix())
        const pixs = ENV.pixs

        function draw() {
            ENV.hue += .3
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, .9)";
            ctx.fillRect(0, 0, ENV.width, ENV.height);
            ctx.restore();
            pixs.forEach(pix => pix.draw())
            requestAnimationFrame(draw)
        }
        draw()
    }
    init()
}
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

    componentDidMount() {
        setBg()
    }

    render() {
        return (
            <div className={styles.wrapper}>
            <canvas/>
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