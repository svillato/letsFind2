const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// connecting mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conncetion error:'));
db.once ('open', function() {
  console.log("we're in"); 
}); 

var Post = require("../models/post"); 

//add post
app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function (err){
    if (err) {
      console.log(err)
    }
    res.send({
      sucess: true,
      message: 'Post saved'
    })
  })
})

// fetch posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (err, posts) {
    if (err) { console.error(err); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

app.listen(process.env.PORT ||8081)
