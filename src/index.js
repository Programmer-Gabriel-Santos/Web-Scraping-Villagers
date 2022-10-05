const cheerio = require('cheerio')
const axios = require('axios')

const url = "https://stardewvalleywiki.com/Villagers"
const baseUrlData = "https://stardewvalleywiki.com"

const getVillagers = async ()=>{
    try {
        
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        const villagers = []

        $('li.gallerybox').each((index, element)=>{

            let name = $(element).find('div > .gallerytext > p > a').text()
            let avatar = url + $(element).find('div > .thumb > div > a').attr('href')
            let img =  baseUrlData + $(element).find('div > .thumb > div > a > img').attr('src')

            const data = {name, avatar, img}

            villagers.push(data)
        })
        
        console.log(villagers)

    } catch (error) {
        console.log(error)
    }
}

getVillagers()