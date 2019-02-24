let url = 'http://104.248.110.218:4500';

const fetchRes = (url) => {
    return fetch(url)
        .then((res)=>{
            console.log(res.url, res)
            return res.json()
        })
}

export const getSlider = () => {
    return fetchRes(url+'/banner')
}