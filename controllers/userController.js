var con = require('../config/config')
var Razorpay = require('../Payment/Razorpay')
var userModel = require('../Models/userModel')
const hetHomePage = (req,res)=>{
     res.render('index'); 
}
const getLoginPage = (req,res)=>{
    res.render('user/login')
}
const getRegisterPage = (req,res)=>{
    res.render('user/register')
}
const getMyorderPage = (req,res)=>{
    let user = req.session.user;
    res.render('user/myOrder',{user})
}
const doRegister = async (req,res)=>{
    console.log(req.body)
    try {
        await userModel.create(req.body)
        console.log("user created")
        res.redirect('/login')
    } catch (error) {
        console.log(error)
    }
}
const doLogin = (req,res)=>{
        console.log(req.body)
        let {email} =req.body;
        let {password} = req.body;
        let sql="select * from user where email = ? and password = ?"
        con.query(sql,[email,password],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
                if(result.length >0){
                    console.log("login success")
                    req.session.user = result[0];
                    console.log(req.session.user,"from session data")
                    res.redirect('/')
                }else{
                    console.log("login error")
                    res.redirect('/login')

                }
            }
        })

}
const logout =(req,res)=>{
    req. session.destroy();
    res.redirect('/')
}
const addTocart =(req,res)=>{
        let ProductId = req.params.Pid;
        let userId = req.session.user.id;
        let query1 = "select * from cart where ProductId = ? and userId = ?"
        con.query(query1,[ProductId,userId],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length>0){
                        var qty = result[0].qty;
                        let cartID = result[0].id;
                            qty = qty+1;
                            let qry2 =  "update cart set qty = ? where id = ?"
                            con.query(qry2,[qty,cartID],(err,row)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    res.redirect('/')
                                }
                            })
                    }else{
                       let qry3 = "insert into cart set ?"
                       let data = {
                        ProductId,
                        userId
                       }
                       con.query(qry3,data,(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                res.redirect('/')
                            }
                       }) 
                    }
                }
        })
        
}
const getSingleProduct = (req,res)=>{
        let pid = req.params.id;
        let qry = "select * from product where id = ?"
        con.query(qry,[pid],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    let product = result[0]
                    let user = req.session.user;
                   res.render('user/singleView',{product,user}) 
                }
        })
}
const checkOut= (req,res)=>{
        let pid = req.params.id;
        let price = req.params.price;
        console.log(pid,price)
        var options = {
            amount:price,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
            Razorpay.orders.create(options,(err,order)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(order)
                        res.render('user/checkOut',{order})
                    }
            })
}

const payVarify = async(req,res)=>{
        console.log("verifiction route working---")
        console.log(req.body)
        let data = req.body;
        var crypto = require('crypto')
        let order_id  =  data['response[razorpay_order_id]']
        var payment_id = data[ 'response[razorpay_payment_id]']
        const razorpay_signature = data[ 'response[razorpay_signature]']
        const key_secret = "DkNW0S4KbIGO9x25IPRyyDcu";
        let hmac = crypto.createHmac('sha256', key_secret); 
        await hmac.update(order_id + "|" + payment_id);
        const generated_signature = hmac.digest('hex');
        if(razorpay_signature===generated_signature){
                console.log("payment verified")
            
        
        }else{
            console.log("payment failed")
        }
}
module.exports = {
    hetHomePage,
    getLoginPage,
    getRegisterPage,
    doRegister,
    doLogin,
    getMyorderPage,
    addTocart,
    getSingleProduct,
    checkOut,
    payVarify,
    logout
}


