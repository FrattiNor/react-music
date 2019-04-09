let url = 'http://127.0.0.1:9000';

const fetchRes = (url) => {
    return fetch(url)
        .then((res)=>{
            // console.log(res.url, res)
            return res.json()
        })
}

export const getSlider = () => {
    return fetchRes(url+'/banner')
}

export const getSong = () => {
    return fetchRes(url+'/personalized/newsong')
}

export const getDang = () => {
    return fetchRes(url+'/personalized')
}

export const getSingRank = () => {
    return fetchRes(url+'/toplist/artist')
}

export const getSongRank = () => {
    return fetchRes(url+'/toplist')
}

export const getRankSong = (id) => {
    return fetchRes(url+`/top/list?idx=${id}`)
}

export const search = ({keywords, type}) => {
    return fetchRes(url+`/search?keywords=${keywords}&type=${type}`)
}



