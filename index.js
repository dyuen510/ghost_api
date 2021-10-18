const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const location = [];

app.get('/', (req, res) => {
    res.json('Welcome to my haunted locations API');
})

app.get('/california', (req, res) => {
    axios.get('https://www.cntraveler.com/gallery/the-most-haunted-places-in-america')
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        // $("p:contains('the')", html).each(function () {
        //     const title = $(this).text();
        //     const url = $(this).attr('href');
        //     location.push({
        //         title,
        //         url
        //     });
        // })

            $('h2[class="BaseWrap-sc-TURhJ BaseText-fFzBQt GallerySlideCaptionHed-lgowel eTiIvU iBiECn fobiWd"]').each(function () {
                const title = $(this).text();
                location.push({
                    title,

                })
            })

            $('div[class="GallerySlideCaptionDek-diuFsG lmhVIB"]').each(function () {
                const desc = $(this).text();
                location.push({
                    
                    desc
                })
            })

        res.json(location);
    }).catch((err) => console.log(err));
})

console.log(PORT);
app.listen(PORT, () => console.log(`Server running on ${PORT}`))