var { Query } = require("../db/db");
const { v4: uuid } = require("uuid");
const puppeteer = require('puppeteer');
const PageScraper = require('./pager')


class Scraper {
  sites = [];
  finalData = [];
  loadedData = [];
  query = "SELECT * from sources LIMIT 1";
  constructor() {}

  scrape() {
    this.getSitesToScrape();
  }

  logScrape(){
    return new Promise(async (resolve, reject) => {
        var id = uuid();
        try {
          let data = await Query(
            `INSERT into  = '${id}'`
          );
          if (data.length) resolve(data);
          reject([]);
        } catch (e) {
          reject(e);
        }
      });
  }

  getFields(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Query(
          `SELECT * from sourceFields where sourceId = '${id}'`
        );
        if (data.length) resolve(data);
        reject([]);
      } catch (e) {
        reject(e);
      }
    });
  }

  getFieldDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Query(
          `SELECT * from fields`
        );
        if (data.length) resolve(data);
        reject([]);
      } catch (e) {
        reject(e);
      }
    });
  }

  getTypeDetails() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Query(
          `SELECT * from fieldTypes`
        );
        if (data.length) resolve(data);
        reject([]);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getSitesToScrape() {
    let data = await Query(this.query);
    for (var y = 0; y < data.length; y++) {
      var id = data[y].id;
      try {
        let g = await this.getFields(id);
        this.loadedData.push({
          ...data[y],
          fields: g,
        });
      } catch (er) {}
    }
    this.refineData();
  }

  async scrapeIt(fg){
       await  this.startScrapingSession(fg.url, fg.fields)
  }

  async startScrapingSession(url, fields){
      var t = PageScraper;
      t.url = url;
      t.fields = fields;
      var br = await this.getBrowser();
      t.get(br)
  }

  async getBrowser(){
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        browser.close()
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
  }


  async refineData(d) {
    if (!d) d = this.loadedData;
    let pol = await this.getFieldDetails();
    let lok = await this.getTypeDetails();
    console.log(lok)
    d.map(async (data, ind) => {
      var t = {
        name: data.label,
        url: data.uri,
        id: data.id,
        propertyDetailSelector: ".featured-image > a",
        startFromPage: 0,
        paginationType: data.paginationTypeId,
        fields: data.fields.map((bv)=>{
            return { label: pol.filter(m=>m.id == bv.fieldId)[0].label, selector: bv.selector, type: lok.filter(m=>m.id == bv.typeId)[0].label }
        })
      };
     await this.scrapeIt(t)
    });
  }
}


module.exports = Scraper;
