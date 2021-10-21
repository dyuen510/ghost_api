const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { children } = require('cheerio/lib/api/traversing');
const { forEach } = require('methods');


const app = express();
const resources = [
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

const location = [];


resources.forEach(resource => {
    axios.get(resource.address)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);


        $('div[class="NodeArticlestyles__ObscuredContentWrapper-sc-1dhoc8d-6 ecjuTH"]',).map(function (index) {
            const titles = $(this).children('div[class="styles__BodyText-d07mme-0 VpaCC page-element paragraph undefined "]')
            .children('p').children('strong').children('a').map(function() {

                    const title = $(this).text();

                    const country = 'United States';

            
                            location.push(
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

            location.push({
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
                        location.push({
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
    res.json(location);
})
console.log(PORT);
app.listen(PORT, () => console.log(`Server running on ${PORT}`))