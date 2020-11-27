var cron = require('node-cron');
var Scraper = require('../scraper')
 
cron.schedule('3 5 * * *', async () => {
  new Scraper().scrape();
});