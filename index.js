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

        $('div[class="NodeArticlestyles__ObscuredContentWrapper-sc-1dhoc8d-6 ecjuTH"]').map(function (index) {
            const titles = $(this).children('div[class="styles__BodyText-d07mme-0 VpaCC page-element paragraph undefined "]')
            .children('p').children('strong').children('a').map(function(data) {
            
                    const title = $(this).text();
                    const loca = $(this).parents('strong').parent('p').siblings('div').children('h2').map(function () {
                        console.log( $(this).text());
                    }).text();
                    const description = $(this).text();
                    const country = 'United States';
                    // console.log(description);
                    // console.log(loca);
                    // if(index >= 1){
                    //     const title = $(this).children('div').children('p').children('strong').children('a').text();
                    //     const description = $(this).children('div').children('p').text();
                    //     console.log(description); 
            
                        // console.log(title);
            
                            location.push(
                                {
                                    title,
                                    country,
                                    description,
                                }
                            )
                            
                
                    

                        
            
        
            // title.map(function () {
            //     if(index >= 1){
            //         const title = $(this).children('div').children('p').children('strong').children('a').text();
            //         const description = $(this).children('div').children('p').text();
            //         console.log(description); 
        
            //         console.log(title);
        
            //             location.push(
            //                 {
            //                 title
            //                 }
            //             )
                        })
            })
            // if(index >= 1){
            // const title = $(this).children('div').children('p').children('strong').children('a').text();
            // const description = $(this).children('div').children('p').text();
            // console.log(description); 

            // console.log(title);

            //     location.push(
            //         {
            //         title
            //         }
            //     )
            
            // console.log(title)
            // location.push({
            //     title
            // })
                // }


        $(`section`).map(function (index) {
            if(index >= 1 && index && index < 35){
            const title = $(this).children('h2').text();
            // console.log(title);
            const description = $(this).find('div[class="text"]').children('p').text();
                // console.log(description);
            const image = $(this).find('div[class="content"]').children('div[class="img"]').children('div').children('img').attr('data-src');
            // console.log(image);

            location.push({
                title,
                description,
                image
            })
        }
        })
        
        $('figure[class="GallerySlideFigure-hyAGVk nPCSW"]').map(function () {

                    const title = $(this).find('h2').text();
                    const description = $(this).find('div[class = "GallerySlideCaptionDek-diuFsG crRUvF"]').text();
                    // const image = $(this).find('div[class ="GallerySlideAssetContainerInner-jXaSRz gpvvFG"]')
                    // .children('span[class ="BaseWrap-sc-TURhJ SpanWrapper-kGGzGm eTiIvU fCMktF responsive-asset GallerySlideResponsiveAsset-kJgSyW bDofQw"]')
                    // .children('picture[class="ResponsiveImagePicture-jIKgcS fArnhQ GallerySlideResponsiveAsset-kJgSyW bDofQw responsive-image"]')
                    // .children('img[class="ResponsiveImageContainer-dlOMGF byslZC responsive-image__image"]').attr('src');

                    const image = $(this).find('img[class = "ResponsiveImageContainer-dlOMGF byslZC responsive-image__image"]').attr('src');
                    // const image = JSON.parse(images);
                    // console.log(image);
                        location.push({
                            title,
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