module.exports = {
  fields: {
    1: { label: 'Title', id: 1, isCompatible: true, },
    2: { label: 'Description', id: 2, isCompatible: false, },
  },

  paginationTypes: {
    1: { name: 'infinite-scroll', id: 1, },
    2: { name: 'paged', id: 2 },
  },

  sources: {
    1: {
      name: 'meQasa',
      url: 'https://meqasa.com',
      id: 1,
      startFromPage: 0,
      propertyDetailSelector: '.featured-image > a',
      fields: {
        1: { label: 'Title', selector: '.details-title', type: 'text', },

        2: {
          "label": "Description",
          "selector": ".section-info-content",
          "type": "text"
        }
      },
    },
    2: {
      name: 'Business Ghana',
      url: 'https://businessghana.com/site/real-estates',
      id: 2,
      propertyDetailSelector: '.featured-image > a',
      startFromPage: 0,
      paginationType: 1,
      fields: {
        1: { label: 'Title', selector: '.details-title', type: 'text', },

        2: {
          "label": "Description",
          "selector": ".section-info-content",
          "type": "text"
        }
      },
    },
  },

  scrapers: {
    1: {
      label: 'New Properties Scraper',
      id: 1,
    }
  }
}
