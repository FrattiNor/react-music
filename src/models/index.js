import { getHotSearch, getLyrics, getAlbum, getSingerIt, getSingerSongList, getSingerSong, getSongDetail, getSlider, getSong, getDang, getSingRank, getSongRank, getRankSong, search, getSongListDetail, getSongList, getHotSinger } from '../services'

export default {

    namespace: 'index',

    state: {
        music: {
            id: 347230,
            name: "海阔天空",
            picUrl: "https://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg",
            src: 'https://music.163.com/song/media/outer/url?id=347230.mp3',
            time: '',
            min: '',
            sec: '',
            isPause: true,
            ar: 'Beyond'
        },
        update: false,
        looper: 1,
    },

    subscriptions: {

    },

    effects: {
        // recommend
        *getSlider( _, { call }) {
            const response = yield call(getSlider)
            return response
        },
        *getSong( _, { call }) {
            const response = yield call(getSong)
            return response
        },
        *getDang( _, { call }) {
            const response = yield call(getDang)
            return response
        },

        // rank
        *getSingRank( _, { call }) {
            const response = yield call(getSingRank)
            return response
        },
        *getSongRank( _, { call }) {
            const response = yield call(getSongRank)
            return response
        },
        *getRankSong( { payload }, { call }) {
            const response = yield call(getRankSong, payload)
            return response
        },

        // search
        *search( { payload }, { call }) {
            const response = yield call(search, payload)
            return response
        },

        *getSongList( _, { call }) {
            const response = yield call(getSongList)
            return response
        },

        *getSongListDetail( { payload }, { call }) {
            const response = yield call(getSongListDetail, payload)
            return response
        },

        *getHotSinger( _, { call }) {
            const response = yield call(getHotSinger)
            return response
        },

        *getSongDetail( { payload }, { call }) {
            const response = yield call(getSongDetail, payload)
            return response
        },

        *getSingerSong( { payload }, { call }) {
            const response = yield call(getSingerSong, payload)
            return response
        },

        *getSingerSongList( { payload }, { call }) {
            const response = yield call(getSingerSongList, payload)
            return response
        },

        *getSingerIt( { payload }, { call }) {
            const response = yield call(getSingerIt, payload)
            return response
        },

        *getAlbum( { payload }, { call }) {
            const response = yield call(getAlbum, payload)
            return response
        },

        *getLyrics( { payload }, { call }) {
            const response = yield call(getLyrics, payload)
            return response
        },

        *getHotSearch( _, { call }) {
            const response = yield call(getHotSearch)
            return response
        },
    },

    reducers: {
        'setTime'(state, { payload: { time, min, sec } }) {
            console.log('setTime',time, min, sec)
            let music = state.music;
            music.time = time
            music.min = min
            music.sec = sec
            state.music = music
            return {...state};
        },
        'setPause'(state, { isPause } ) {
            let music = state.music;
            music.isPause = isPause
            state.music = music
            return {...state};
        },
        'setMusic'(state, { payload: { id, name, picUrl, src,ar } } ) {
            let music = state.music;
            music.id = id;
            music.name = name;
            music.picUrl = picUrl;
            music.src = src;
            music.ar = ar;
            music.isPause = false;
            state.music = music
            return {...state};
        },
        'update'(state) {
            state.update = !state.update
            return {...state};
        },
        'setLooper'(state, { payload: { looper } } ) {
            state.looper = looper
            return {...state};
        },
    }

}
