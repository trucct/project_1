const express = require('express')
const connectDB = require('./config/db')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const path = require('path');
const Course= require("./models/Course");
const Content= require("./models/content");
var schemaImages = require('./models/images')
const { ObjectId } = require('mongodb');
const HP = require("./sever/model/HP");


//Nhập khẩu router
const posts = require('./routes/posts')

//Khởi động App 
const app = express()

//Khởi động bodyparser middelware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Set the default templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Khoi dong methodOverride middleware
app.use(methodOverride('_method'))

//Khởi động express middleware
app.use(express.json())

//Kết nối cơ sở dữ liệu
connectDB()

//Một số routes cơ bản có thể đưa vào file riêng trong thư mục routes
app.get('/', (req, res)=> res.render('index'))
app.get('/about', (req, res)=> res.render('about'))

app.get('/',(req, res)=>{

  HP.find((err, char) => {
    if (err) {
        res.json({ "kq": 0, "errMsg": err })
    } else {
        res.render("index", {char})
    }
})
})


//Chay ngam
app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//add

app.get('/trieu/add', function(req, res){
  
  res.render('add')
})

app.post('/trieu/add', function(req, res){
console.log(req.body.masv)

        var newCoures = new Course({
    masv: req.body.masv,
    hovaten: req.body.hovaten,
        })
        newCoures.save((err) =>{
          if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            res.redirect('/trieu');
        }
        })
    }) 



//profile
app.set('view engine')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/profile',(req, res)=>{

  Course.find((err, char) => {
    console.log(char[0])
    if (err) {
        res.json({ "kq": 0, "errMsg": err })
    } else {
      Content.find((err, data) => {
        if (err) {
            res.json({ "kq": 0, "errMsg": err })
        } else {
            res.render("index", {data,element:char[0]})
        }
    })
    
  }
})

})



//trieu
app.set('view engine')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/trieu',(req, res)=>{

  Course.find((err, char) => {
    console.log(char[0])
    if (err) {
        res.json({ "kq": 0, "errMsg": err })
    } else {
      Content.find((err, data) => {
        if (err) {
            res.json({ "kq": 0, "errMsg": err })
        } else {
            res.render("page", {data,element:char[0]})
        }
    })
    
  }
})

})

//upload image
app.post('/profile', function(req, res){

  upload(req, res, function (err) {
  if (err instanceof multer.MulterError) {
    console.log("A Multer error occurred when uploading."); 
  } else if (err) {
    console.log("An unknown error occurred when uploading." + err);
  }else{
      res.send(req.file.filename)
      }
  })
  })


//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/img" || file.mimetype=="image/jpeg"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("avatar");

//sua
app.get('/trieu/edit/:id', function(req, res){
  // ObjectId
  const ID = (req.params.id).trim();

  console.log(req.params.id)
  Course.findById({ _id:ObjectId(ID) }, function(err, char){
    if(err){
      res.json({"kq":0, "errMsg":err})
    }else{
      console.log(char)
      res.render('create',{sinhvien:char})
    }
  })
})
app.post('/trieu/edit', function(req, res){
upload(req, res, function (err) {

  if(err instanceof multer.MulterError){
    res.json({"kq":0, "errMsg":" k loi "});
  }else if (err){
    res.json({"kq":0, "errMsg":"  loi " +err});
  }else{
    //update mongo
    const ID = (req.body.id).trim();
    
    Course.updateOne({_id:ObjectId(ID)},{
        masv: req.body.masv,
        hovaten: req.body.hovaten,
        tuoi: req.body.tuoi,
        email: req.body.email,
        diachi: req.body.diachi,
        lop: req.body.lop
    }, function(err){
      if(err){
        res.json({"kq":0, "errMsg": err})

      }else{
        res.redirect('./')
      }
    });
  }
  })

  })



//add stt
app.post('/post', function(req, res){
    console.log(req.body.masv)
    
            var newContent = new Content({
        content: req.body.content
            })
            newContent.save((err) =>{
              if (err) {
                res.json({ "kq": 0, "errMsg": err });
            } else {
                res.redirect('/profile');
            }
            })
        }) 


app.delete('/trieu/:id', (req, res)=>{
  const email = req.params.id;

  trieu.findByIdAndDelete(id)
  .then(result =>{
    res.json({ redirect: '/trieu'})
  })
  .catch(err =>{
    console.log(err);

  })
})

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))



//Mang routes vào để sử dụng
app.use('/posts', posts)

const PORT = 5000;
app.listen(PORT, () => console.log('Server đã khởi động tại UDA-WEBSOCIAL ${UDA-WEBSOCIAL}'))