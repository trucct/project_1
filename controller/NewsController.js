class NewsController {
    //get /news
        page() {
            res.render('news')
        }
    
    }
    module.exports =new NewsController
    
    const NewsController = require('/.NewsController')