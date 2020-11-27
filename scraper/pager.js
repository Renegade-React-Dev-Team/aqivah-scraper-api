const { all } = require("../routes/fields");

var scraperObject = {
    url: 'http://books.toscrape.com',
    fields: [],
    get : async function(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`, this.fields);
        // Navigate to the selected page
        let allFields = this.fields;
        await page.goto(this.url, { waitUntil: 'domcontentloaded' });
        let scrapedData = [];
        // Wait for the required DOM to be rendered
        async function scrapeCurrentPage(){
         try{
            await page.waitForSelector('body');
         }catch(e){
            browser.close()
         }
         console.log('here')
            // Get the link to all the required books
            let urls = await page.$$eval('a', as => as.map(a => a.href));
            console.log(urls)
            // Loop through each of those links, open a new page instance and get the relevant data from them
            let pagePromise = (link) => new Promise(async(resolve, reject) => {
                let dataObj = {};

                let newPage = await browser.newPage();
                
               try{
                await newPage.goto(link, { waitUntil: 'domcontentloaded' });
                allFields.map(async (v)=>{
                    dataObj[v.label] = await page.$eval(`${v.selector}`, el => el.innerText)
                })
                console.log(dataObj)
               }catch(e){
                    reject(e)
               }
                resolve(dataObj);
                await newPage.close();
            });

            for(link in urls){
                console.log(urls[link])
                if(!urls[link].includes('/real-estates/'))continue;
              try{
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
              }catch(e){

              }
               
                // console.log(currentPageData);
            }
            // When all the data on this page is done, click the next button and start the scraping of the next page
            // You are going to check if this button exist first, so you know if there really is a next page.
            let nextButtonExist = false;
            try{
                const nextButton = await page.$eval('.next > a', a => a.textContent);
                nextButtonExist = true;
            }
            catch(err){
                nextButtonExist = false;
            }
            if(nextButtonExist){
                await page.click('.next > a');   
                return scrapeCurrentPage(); // Call this function recursively
            }
            await page.close();
            return scrapedData;
        }
        let data = await scrapeCurrentPage();
        console.log(data);
        return data;
    }
}

module.exports = scraperObject;