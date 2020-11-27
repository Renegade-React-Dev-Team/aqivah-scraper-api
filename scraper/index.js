var { Query } = require("../db/db");

class Scraper {
  sites = [];
  finalData = [];
  loadedData = [];
  query = "SELECT * from sources";
  constructor() {}

  scrape() {
    this.getSitesToScrape();
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

  scrapeIt(fg){
      console.log(fg)
  }

  async refineData(d) {
    if (!d) d = this.loadedData;
    let pol = await this.getFieldDetails();
    let lok = await this.getTypeDetails();
    d.map((data, ind) => {
      var t = {
        name: data.label,
        url: data.uri,
        id: data.id,
        propertyDetailSelector: ".featured-image > a",
        startFromPage: 0,
        paginationType: data.paginationTypeId,
        fields: data.fields.map((bv)=>{
            return { label: pol.filter(m=>m.id == bv.fieldId)[0].label, selector: bv.selector, type: lok.filter(m=>m.id == bv.fieldId)[0].label }
        })
      };
      this.scrapeIt(t)
    });
  }
}

module.exports = Scraper;
