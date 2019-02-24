import { getSlider } from '../services'

export default {

    namespace: 'index',

    state: {

    },

    subscriptions: {

    },

    effects: {
        *getSlider( _, { call }) {
            const response = yield call(getSlider)
            return response
        }
    },

    reducers: {

    }

}
