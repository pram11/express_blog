var express = require('express');
var router = express.Router();
const USER = require('../model').User
const POST = require('../model').Post

/* GET home page. */
router.get('',(req,res)=>{
  POST.findAll({raw:true}).then((data)=>{
    let post_list = data
    console.log(post_list)
    res.render('index.html',{post_list:post_list})

  })
})
router.get('/login', (req, res) =>{
  let user_list ;
  USER.findAll().then(data=>user_list=data)
  console.log(user_list)
  res.render('login.html', { form: user_list });
});

router.post('/login',(req,res)=>{
  console.log("body:",req.body)
  USER.findOne({where:{
    username:req.body.username,
    }
  }).then((data)=>{
    console.log(data)
    if (!data){
      return res.render('login.html',{error:"fail"})
    }
  }).catch((error)=>{console.log(error)})
});

router.get('/signup',(req,res)=>{
  USER.findAll().then((data)=>{
    console.log(data)
  })
  res.render('signup.html',{init:true})
});

router.post('/signup',(req,res)=>{
  console.log(req.body)
  USER.findAll({where:{
    username:req.body.username
    }
  }).then((data)=>{
    if (data.length!==0){
      console.log("user with username exist1");
      console.log(data)
      return res.render("signup.html",{init:false})
    }
    USER.create({
      username:req.body.username,
      password:req.body.password
    }).then(()=>{
      console.log("success");
      return res.render("signup.html",{init:false})
    }).catch((error)=>{
      console.log("error:",error);
      return res.render("signup.html",{init:false})
    })
  });
})
  
  

module.exports = router;