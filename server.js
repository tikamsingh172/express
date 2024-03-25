const express = require('express');
const path = require('path');

const app = express();
const mainRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const e = require('express');
// const apiKeyMiddleware=require('./middlewares/apiKey');
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

/*--- app level middleware --- */
// app.use(apiKeyMiddleware);


app.use(mainRouter);
app.use('/api/v1', productsRouter);

app.listen(PORT, () => console.log(`server listenig on http://localhost:${PORT}`));