import { getSlider, getSong, getDang, getSingRank, getSongRank, getRankSong, search  } from '../services'

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
        }
    },

    reducers: {

    }

}
