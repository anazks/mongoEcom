
var con = require('../config/config')

const getLoginPage = (req,res)=>{
        res.render('admin/login')
}
const doLogin = (req,res)=>{
        let username = "admin";
        let password = "admin"
        console.log(req.body)
        if(req.body.userName == username && req.body.password == password){
            console.log("Login success")
            req.session.admin =true;
            res.render('admin/adminHome')
        }else{
            console.log("Login error")
            res.redirect('/admin/')
        }
        
}
// get addproduct page
const addproductPage = (req,res)=>{
        res.render('admin/addProduct')
}
const addProduct=(req,res)=>{
    let file = req.files.image;
    const {name} = req.files.image;
    req.body.image = name;
    console.log(req.body)
    var data = req.body;
    file.mv('public/images/Products/'+name,(err)=>{
            if(err){
                console.log(err)
            }else{
                    let sql ="insert into product set ?"
                    con.query(sql,data,(err,row)=>{
                            if(err){
                                console.log(err)
                            }else{
                                res.redirect('/admin/addProduct')
                            }
                    })
            }
    })
}
module.exports= {
    getLoginPage,
    doLogin,
    addproductPage,
    addProduct
}