var cron = require('node-cron');
var Scraper = require('../scraper')
 
const scheduler = function(){
  cron.schedule('3 5 * * *', async () => {
    new Scraper().scrape();
  });
}

module.exports = scheduler;