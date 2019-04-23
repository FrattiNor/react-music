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

export const getSongList = () => {
    return fetchRes(url+`/top/playlist?limit=30&order=new`)
}

export const getSongListDetail = (id) => {
    return fetchRes(url+`/playlist/detail?id=${id}`)
}

export const getHotSinger = () => {
    return fetchRes(url+`/top/artists?offset=0&limit=40`)
}

export const getSongDetail = (id) => {
    return fetchRes(url+`/song/detail?ids=${id}`)
}

export const getSingerSong = (id) => {
    return fetchRes(url+`/artists?id=${id}`)
}

export const getSingerSongList = (id) => {
    return fetchRes(url+`/artist/album?id=${id}&limit=30`)
}

export const getSingerIt = (id) => {
    return fetchRes(url+`/artist/desc?id=${id}`)
}

export const getAlbum = (id) => {
    return fetchRes(url+`/album?id=${id}`)
}

export const getLyrics = (id) => {
    return fetchRes(url+`/lyric?id=${id}`)
}

export const getHotSearch = () => {
    return fetchRes(url+`/search/hot`)
}