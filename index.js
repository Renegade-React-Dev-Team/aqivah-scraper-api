const bodyParser = require('body-parser');
const cors = require('express-cors');
const sqlite3 = require('sqlite3');

const express = require('express');






const sourceRoutes = require('./routes/sources');
const fieldRoutes = require('./routes/fields');
const scraperRoutes = require('./routes/scrapers');
const paginationTypeRoutes = require('./routes/paginationTypes');
const propertyRoutes = require('./routes/properties');
const fieldTypeRoutes = require('./routes/fieldTypes');
const sourceFieldRoute = require('./routes/sourceField');
// const responser = require('@zarcobox/responser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  allowedOrigins: [
    'localhost:*',
  ]
}));





app.use('/sources', sourceRoutes);
app.use('/fields', fieldRoutes);
app.use('/scrapers', scraperRoutes);
app.use('/pagination-types', paginationTypeRoutes);
app.use('/properties', propertyRoutes);
app.use('/field-types', fieldTypeRoutes);
app.use('/sourceFields', sourceFieldRoute)

app.get('/', (req, res) => res.send('welcome to the aqivah api'));

app.listen(PORT, () => console.log('listening on port ' + PORT));

