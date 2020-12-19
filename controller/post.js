
const POST = require('../model').Post
let GET_postCreate = (req,res)=>{
    res.render('post_create.html')

}
let POST_postCreate=(req,res)=>{
    POST.create({
        title:req.body.title,
        text:req.body.text
    })
    res.redirect('/')
}
let GET_postDetail=(req,res)=>{
    let post_id = req.params.id
    console.log(req.params.id)
    POST.findOne({where:{id:post_id}}).then((data)=>{
        console.log("findOne:",data)
        res.render('post_detail.html',{'post':data})
    }).catch((error)=>{
        res.render("error.html")
    })
  }
module.exports= { GET_postCreate,POST_postCreate,GET_postDetail }