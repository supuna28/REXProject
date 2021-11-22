const axios = require('axios');
const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function fetchHTML(url) {
    const { data: html } = await axios.get(url)
    return html
}
async function getJSON(json) {
    let result = JSON.parse(json)
    return result
}

exports.Instagram = {
    async downloader(url) {
        const get = await fetchHTML(url)
        const cdat = cheerio.load(get)
        url = cdat('meta[property="og:url"]').attr('content')
        title = cdat('meta[property="og:title"]').attr('content')
        datadesc = await getJSON(cdat('script[type="application/ld+json"]').html())
        description = datadesc.caption
        likes = datadesc.interactionStatistic.userInteractionCount
        comments = datadesc.commentCount
        // decrypt the link because on this url will be not found or encrypted
        const getreels = await fetch(url + '?__a=1', { method: "get" })
        const creels = await getreels.json()
        let reelsres = creels.graphql.shortcode_media
        let video_url = reelsres.video_url
        let view_count = reelsres.video_view_count
        let play_count = reelsres.video_play_count
        let thumbnail = reelsres.thumbnail_src
        let result = {
            url: url,
            title: title,
            description: description,
            total_like: likes,
            total_comment: comments,
            view_count: view_count,
            play_count: play_count,
            video_link: video_url,
            thumbnail: thumbnail
        }
        return result
    },
    async stalk(username) {
        let data = await fetch(`https://instagram.com/${username}/?__a=1`)
        let info = data.graphql.user
        let result = {
            username: info.username,
            fullname: info.full_name,
            bio: info.biography,
            followers: info.edge_followed_by.count,
            followed: info.edge_follow.count,
            pplink: info.profile_pic_url_hd
        }
        return result
    }
}

exports.waifupics = {
    async sfw(type) {
        let url = `https://api.waifu.pics/sfw/${type}`
        switch(type) {
            case 'waifu':
                data = await fetchHTML(url)
                return data
            case 'neko':
                data = await fetchHTML(url)
                return data
            case 'shinobu':
                data = await fetchHTML(url)
                return data
            case 'megumin':
                data = await fetchHTML(url)
                return data
            default:
                return "404 Not found"
        }
    },
    async nsfw(type) {
        let url = `https://api.waifu.pics/nsfw/${type}`
        switch(type) {
            case 'waifu':
                data = await fetchHTML(url)
                return data
            case 'neko':
                data = await fetchHTML(url)
                return data
            case 'trap':
                data = await fetchHTML(url)
                return data
            case 'blowjob':
                data = await fetchHTML(url)
                return data
            default:
                return "404 not found"
        }
    }
}