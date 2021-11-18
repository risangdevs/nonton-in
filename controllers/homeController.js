const {Movie}=require('../models/index')

class HomeController{
    static readMovie(req,res){
        Movie.findAll()
        .then(data=>{
            res.render('home',{data})
            console.log(data);
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports=HomeController