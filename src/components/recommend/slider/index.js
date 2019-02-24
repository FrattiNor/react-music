import React, { Component } from 'react';
import { connect } from 'dva';
import './index.css'

@connect(({ index }) => ({
    index
}))

class slider extends Component {
    state = {
        theSilder: [],
        SilderFirst: [],
        SilderLast: [],
        // baseWidth: document.body.clientWidth,
        baseWidth: document.documentElement.clientWidth,
        autoPlay: '', // 自动循环播放函数
        setTimeout: '', // 延迟生效的函数
        length: '', // slider长度
        time: 0, // 动画时间
        index: 1, // 图片索引
        distance: 0, // 图片跟随distance移动，也就是设置图片可以滑动
        minX: 100, // 移动最低距离触发滑动
        startX: '', // touch开始坐标
        moveX: '' // touch移动的距离
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'index/getSlider'
        })
            .then((res) => {
                console.log(res)
                let sliderLength = res.banners.length;

                this.setState({
                    distance: -(this.state.index * this.state.baseWidth),
                    length: sliderLength,
                    SilderFirst: res.banners[0],
                    SilderLast: res.banners[sliderLength - 1],
                    theSilder: res.banners
                });
            })
        this.autoPlay()
    }
    componentWillUnmount() {
        this.stopAutoPlay()
    }
    touchStart(e) {
        clearInterval(this.state.autoPlay) // 清除自动循环函数
        clearTimeout(this.state.setTimeout) // 清除延迟函数
        this.setState({
            time: 0,
            // 获得点击的位置
            startX: e.touches[0].pageX
        })
        this.changeFirstLast()
    }
    touchMove(e) {
        // 获得移动的位置
        let _nextX = e.touches[0].pageX
        // 获得移动的距离
        let _moveX = _nextX - this.state.startX
        // 设置图片移动
        let _distance = -(this.state.index * this.state.baseWidth - _moveX)
        this.setState({
            moveX: _moveX,
            distance: _distance
        })
    }
    touchEnd() {
        this.autoPlay()
        let _index
        let _moveX = this.state.moveX
        let _minX = this.state.minX
        if (Math.abs(_moveX) < _minX) {
            _index = 'noEnough'
        } else {
            if (_moveX > _minX) {
                _index = this.state.index - 1
            } else {
                _index = this.state.index + 1
            }

        }
        this.setState({
            time: 0.3,
            moveX: 0
        })
        this.sliderMove(_index)
    }
    sliderMove(newIndex) {
        if (newIndex === 'noEnough') {
            newIndex = this.state.index
        }
        this.setState({
            time: 0.3,
            index: newIndex,
            distance: -(newIndex * this.state.baseWidth)
        })
        // 移动函数结束后判断图片是否在最左或最右边
        let setTime = setTimeout(() => {
            this.changeFirstLast()
        }, 300)
        this.setState({
            setTimeout: setTime
        })
    }
    // 当图片在最左或最右边时修改到正确位置
    changeFirstLast() {
        const { length } = this.state
        console.log(length)
        if (this.state.index === 0) {
            this.setState({
                time: 0,
                index: length,
                distance: -((length) * this.state.baseWidth)
            })
        }
        if (this.state.index === length + 1) {
            this.setState({
                time: 0,
                index: 1,
                distance: -(1 * this.state.baseWidth)
            })
        }
    }
    // 自动播放函数
    autoPlay() {
        let SlideInter = setInterval(() => {
            let _index = this.state.index + 1
            this.sliderMove(_index)
        }, 3000)
        this.setState({
            autoPlay: SlideInter
        })
    }
    stopAutoPlay() {
        clearInterval(this.state.autoPlay) // 清除自动循环函数
        clearTimeout(this.state.setTimeout) // 清除延迟函数
    }
    render() {
        const { length } = this.state
        let slideBoxStyle = {
            marginLeft: this.state.distance / this.state.baseWidth * 100 + '%',
            width: (this.state.length + 2) * 100 + '%',
            transition: this.state.time + 's'
        }
        let sliderPicStyle = {
            width: 1 / (this.state.length + 2) * 100 + '%'
        }
        let onPointStyle = {
            borderRadius: 25 + '% / ' + 50 + '%'
        }
        let pointStyle = {
            borderRadius: 50 + '%'
        }
        let pointBoxStyle = {
            paddingLeft: (100 - this.state.length*8+4)/2 + '%'
        }
        return (
            <div className="slider" ref="slider">

                <div className="sliderBox" onTouchEnd={e => this.touchEnd(e)} onTouchMove={e => this.touchMove(e)}  onTouchStart={e => this.touchStart(e)} style={slideBoxStyle}>
                    <a className="sliderA" href={this.state.SilderLast.linkUrl} style={sliderPicStyle}>
                        <img alt="slider" className="sliderImg" src={this.state.SilderLast.imageUrl} />
                    </a>
                    {
                        this.state.theSilder.map((item, number) => {
                            return (
                                <a className="sliderA" href={item.linkUrl} key={number} style={sliderPicStyle}>
                                    <img alt="slider" className="sliderImg" src={item.imageUrl} />
                                </a>
                            )
                        })
                    }
                    <a className="sliderA" href={this.state.SilderFirst.linkUrl} style={sliderPicStyle}>
                        <img alt="slider" className="sliderImg" src={this.state.SilderFirst.imageUrl} />
                    </a>
                </div>

                <div className="pointBox" style={pointBoxStyle}>
                    {
                        this.state.theSilder.map((item, number) => {
                            return (
                                <div
                                    className={
                                        (((number + 1) === this.state.index) ||
                                            (number === (length - 1) && this.state.index === 0) ||
                                            (number === 0 && this.state.index === (length + 1))) ?
                                            'point on' : 'point'
                                    }
                                    key={number}
                                    style={
                                        (((number + 1) === this.state.index) ||
                                            (number === (length - 1) && this.state.index === 0) ||
                                            (number === 0 && this.state.index === (length + 1))) ?
                                            onPointStyle : pointStyle
                                    }
                                />
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}

export default slider;