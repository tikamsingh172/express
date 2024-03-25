const router = require('express').Router();
const apiKeyMiddleware = require('../middlewares/apiKey');

/*--- router level middleware ---*/
// router.use(apiKeyMiddleware);

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname + '/about.html'));
});


router.get('/services', (req, res) => {
    res.render('services',{title:'Services'});
});

const data = [
    {
        id: '1',
        name: 'Mobile',
        url: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '2',
        name: 'Laptop',
        url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
    }
]

router.get('/api/v1/gallery', apiKeyMiddleware, (req, res) => {
    res.render('gallery', { title: 'Gallery', data });
});


module.exports = router;