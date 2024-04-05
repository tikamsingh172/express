const express = require('express');
const app = express();
const mainRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const ErrorHandler = require('./errors/ErrorHandler');
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

// app.use((req, res, next) => {
//     return res.json({ message: 'page not found!' });
// })


// app.use((err,req,res,next)=>{
//     console.log('Error:',err.message);
//     res.status(422).json({message:err.message});
// })

app.use((req, res, next) => {
    next(ErrorHandler.notFoundError('page not found !'));
})

app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status)
            .json({
                error: {
                    status: err.status,
                    message: err.message
                }
            })
    } else {
        res.status(500)
            .json({
                error: {
                    status: err.status||500,
                    message: err.message
                }
            })
    }
})

app.listen(PORT, () => console.log(`server listenig on http://localhost:${PORT}`));