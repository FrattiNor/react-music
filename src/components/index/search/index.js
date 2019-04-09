import React, { Component } from 'react';
import './index.css';
import { connect } from 'dva';

import { back, error, search_black, play } from '../../../assets/asset'

@connect(({ index }) => ({
    index
}))
class index extends Component {
	state = {
        marginLeft: '0',
        current: 'song',
        keywords: '',
        song: [],
        singer: [],
	}

	componentDidMount() {
        
    }   
    
    // getBase64 = (imgUrl) => {
	// 	window.URL = window.URL || window.webkitURL;
	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open('get', imgUrl, true);
	// 	// 至关重要
	// 	xhr.responseType = 'blob';
	// 	xhr.onload = function () {
	// 		if (this.status == 200) {
	// 			//得到一个blob对象
	// 			var blob = this.response;
	// 			console.log('blob', blob)
	// 			//  至关重要
	// 			let oFileReader = new FileReader();
	// 			oFileReader.onloadend = function (e) {
	// 				let base64 = e.target.result;
	// 				console.log('方式一》》》》》》》》》', base64)
	// 			};
	// 			oFileReader.readAsDataURL(blob);
	// 		}
	// 	}
	// 	xhr.send();
    // }
    
    handleChange = (current, marginLeft) => {
        this.setState({
            current,
            marginLeft
        })
    }

    getText = (e) => {
        this.setState({
            keywords: e.target.value
        })
    }

    deleteText = () => {
        this.setState({
            keywords: ''
        })
    }

    searchText = () => {
        const { keywords } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: 'index/search',
            payload: {
                keywords,
                type: 1
            }
        })
        .then((res)=>{
            if(res.code == 200) {
                this.setState({
                    song: res.result.songs || []
                })
            }
        })
        dispatch({
            type: 'index/search',
            payload: {
                keywords,
                type: 100
            }
        })
        .then((res)=>{
            if(res.code == 200) {
                this.setState({
                    singer: res.result.artists || []
                })
            }
        })
    }

	render() {
        const { marginLeft, current, keywords, song, singer } = this.state
        const { handleSearchBack } = this.props;
		return (
            <div className="search_index">
                <img className="serach_back" src={back} onClick={handleSearchBack} />
                <input type="text" className="search_text" onChange={this.getText} value={keywords} />
                <img className="serach_error" src={error} onClick={this.deleteText} />
                <img className="serach_search" src={search_black} onClick={this.searchText} />

                <div className="search_content">
                    <div className="search_content_title">
                        <div onClick={(e) => this.handleChange('song', '0')} className={current == 'song' ? "search_content_title_text current" : 'search_content_title_text'}>单曲</div>
                        <div onClick={(e) => this.handleChange('singer', '-100%')} className={current == 'singer' ? "search_content_title_text current" : 'search_content_title_text'}>歌手</div>
                    </div>

                    <div className="search_content_body">
                        <div className="search_body" style={{ marginLeft }}>
                            <div className="search_content_song search_body_body">
                                {
                                    song.map((item, index)=>{
                                        return <div className="songList" key={index}>
                                            <div className="songName">{item.name}</div>
                                            <div className="songArtists">{item.artists.map((item, index) => { return ` ${item.name} ` })}</div>
                                            <img className="songPlay" src={play} />
                                        </div>
                                    })
                                }
                            </div>
                            <div className="search_content_singer search_body_body">
                                {
                                    singer.map((item, index)=>{
                                        return <div className="songList" key={index}>
                                            <img className="singerImg" src={item.img1v1Url} />
                                            <div className="singerName">{item.name}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default index;