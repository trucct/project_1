const Course = require('./models/Course')
class SiteController{
    page(req, res){

        Course.find({}, function (err, course) {
            if (!err) res.json(courses);
            res.status(400).json({ error: 'ERROR!!'});
        
    })
    
    }
}
module.exports =new SiteController 