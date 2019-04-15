import { getSlider, getSong, getDang, getSingRank, getSongRank, getRankSong, search, getSongListDetail, getSongList, getHotSinger } from '../services'

export default {

    namespace: 'index',

    state: {

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
        }
    },

    reducers: {

    }

}
