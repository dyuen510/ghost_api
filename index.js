const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { children } = require('cheerio/lib/api/traversing');
const { forEach } = require('methods');


const app = express();
const us_resources = [
    {
    
        address:'https://www.cntraveler.com/gallery/the-most-haunted-places-in-america',
        base: ''
    },
    {
        
        address:'https://www.thrillist.com/travel/nation/most-haunted-places-in-america',
        base: ''
    },
    {
        
        address:'https://www.bobvila.com/slideshow/the-most-haunted-places-in-america-52383',
        base: ''
    }
]

const jp_resources = [
    {
        address: 'https://www.atlasobscura.com/lists/supernatural-japan',
        base: ''
    }
]

const ch_resources = [
    {
        address: 'https://www.funeralwise.com/digital-dying/the-eight-most-haunted-places-in-china/',
        base: ''
    },
    {
        address: 'https://brandscovery.com/business/content-2253789-top-7-haunted-places-china#/',
        base: ''
    }
]

const locations = [];



    ch_resources.forEach(resource => {
        axios.get(resource.address)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);

                $('div[class="entry-content"]').map(function () {
                    const title = $(this).children('p').children('strong').children('em').children('a').each(function () {
                        const title = $(this).clone().children().remove().end().text();
                        const country = 'China';
                        const description = $(this).parents('em').parents('strong').parents('p').clone().children().remove().end().text();
                        // console.log(description);
                        locations.push({
                            title,
                            country,
                            description
                        })
                    });
                })

                $('div[itemprop="articleBody"]').find('h2').map(function () {
                    const title = $(this).text();
                    console.log(title);
                    const country = "China";

                    locations.push({
                        title,
                        country
                    })

                })

            })
    })

    jp_resources.forEach(resource => {
        axios.get(resource.address)
            .then(response => {

                const html = response.data;
                const $ = cheerio.load(html);

                $('div[class ="index-card-wrap"]').map(function () {
                    const title = $(this).children('a').children('div').children('h3').text();
                    const location = $(this).children('a').children('div').children('div[class="detail-sm place-card-location"]').text();
                    const country = 'Japan';
                    const latlong = $(this).children('a').children('div').children('div[class="lat-lng"]').text();
                    const image = $(this).children('a').children('figure').children('img').attr('data-src');
                    const description =$(this).children('a').children('div').children('div[class="subtitle-sm content-card-subtitle js-subtitle-content"]').text();
                    // console.log(title);

                    locations.push({
                        title,
                        location,
                        latlong,
                        country,
                        description,
                        image
                    })
                })
            })
    })

    us_resources.forEach(resource => {
        axios.get(resource.address)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);


        $('div[class="NodeArticlestyles__ObscuredContentWrapper-sc-1dhoc8d-6 ecjuTH"]',).map(function (index) {
            const titles = $(this).children('div[class="styles__BodyText-d07mme-0 VpaCC page-element paragraph undefined "]')
            .children('p').children('strong').children('a').map(function() {

                    const title = $(this).text();

                    const country = 'United States';

            
                            locations.push(
                                {
                                    title,
                                    country,
                                    
                                }
                            )
                            
                        })
            })


        $(`section`).map(function (index) {
            if(index >= 1 && index && index < 35){
            const title = $(this).children('h2').text();
            const country = 'United States';

            // console.log(title);
            const description = $(this).find('div[class="text"]').children('p').text();
                // console.log(description);
            const image = $(this).find('div[class="content"]').children('div[class="img"]').children('div').children('img').attr('data-src');
            // console.log(image);

            locations.push({
                title,
                country,
                description,
                image
            })
        }
        })
        
        $('figure[class="GallerySlideFigure-hyAGVk nPCSW"]').map(function () { 
                    const country = 'United States';

                    const title = $(this).find('h2').text();
                    const description = $(this).find('div[class = "GallerySlideCaptionDek-diuFsG crRUvF"]').text();

                    const image = $(this).find('img[class = "ResponsiveImageContainer-dlOMGF byslZC responsive-image__image"]').attr('src');
                        locations.push({
                            title,
                            country,
                            description,
                            image
                        })
                    })


    })
})


app.get('/', (req, res) => {
    // res.json('welcome to my haunted USA locations API')
    res.json(locations);
})
console.log(PORT);
app.listen(PORT, () => console.log(`Server running on ${PORT}`))