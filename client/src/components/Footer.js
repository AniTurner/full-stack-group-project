import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <p>{(new Date().getFullYear())} &copy; <a href="https://github.com/ahmad1598">Ahmad Rasoulpour</a>, <a href="https://github.com/yummywakame">Olivia Meiring</a> &amp; <a href="https://github.com/AniTurner">Ani Turner</a></p>
        )
    }
}
export default Footer