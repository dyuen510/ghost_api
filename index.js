const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();
const resources = [
    {
        address:'https://www.cntraveler.com/gallery/the-most-haunted-places-in-america',
        base: ''
    },
    {
        address:'https://www.bobvila.com/slideshow/the-most-haunted-places-in-america-52383',
        base: ''
    }
]

const location = [];

app.get('/', (req, res) => {
    res.json('Welcome to my haunted locations API');
});

resources.forEach(resource => {
    axios.get(resource.address)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);


        $(`section`).map(function (index) {
            if(index > 1 && index && index < 35){
            const title = $(this).children('h2').text();
            // console.log(title);
            const description = $(this).find('div[class="text"]').children('p').text();
                console.log(description);

            location.push({
                title,
                description
            })
        }
        })
        
        $('figure[class="GallerySlideFigure-hyAGVk nPCSW"]').map(function () {

                    const title = $(this).find('h2').text();
                    const description = $(this).find('div[class = "GallerySlideCaptionDek-diuFsG crRUvF"]').text();
                    const photos=[];
                    // console.log(title);
                        location.push({
                            title,
                            description
                        })
                    })


    })
})

// app.get('/california', (req, res) => {
//     axios.get('https://www.cntraveler.com/gallery/the-most-haunted-places-in-america')
//     .then((response) => {
//         const html = response.data;
//         const $ = cheerio.load(html);

//         // $("p:contains('the')", html).each(function () {
//         //     const title = $(this).text();
//         //     const url = $(this).attr('href');
//         //     location.push({
//         //         title,
//         //         url
//         //     });
//         // })

//             // $('h2[class="BaseWrap-sc-TURhJ BaseText-fFzBQt GallerySlideCaptionHed-lgowel eTiIvU iBiECn fobiWd"]').each(function () {
//             //     const title = $(this).text();
//             //     location.push({
//             //         title,

//             //     })
//                 $('figure[class="GallerySlideFigure-hyAGVk nPCSW"]').map(function () {

//                     const title = $(this).find('h2').text();
//                     const description = $(this).find('div[class = "GallerySlideCaptionDek-diuFsG crRUvF"]').text();
//                     const photos=[];

//                     location.push({
//                         title,
//                         description
//                     })
//                 // })

//             })
//         res.json(location);
//     }).catch((err) => console.log(err));
// })

app.get('/california', (req, res) => {
    res.json(location);
})
console.log(PORT);
app.listen(PORT, () => console.log(`Server running on ${PORT}`))