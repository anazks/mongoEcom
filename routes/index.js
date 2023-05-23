var express = require('express');
var router = express.Router();
var checkUser = require('../middleware/checkUser')
var {
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
} = require('../controllers/userController')
/* GET home page. */
router.get('/',hetHomePage)
router.get('/login',getLoginPage)
router.get('/myorder',checkUser,getMyorderPage)
router.get('/register',getRegisterPage)
router.post('/register',doRegister)
router.post('/login',doLogin)
router.get('/buy-now/:id',getSingleProduct)
router.get('/logout',logout)

router.get('/add-to-cart/:Pid',addTocart)
router.get('/check-out/:price/:id',checkOut)
router.post('/varify',payVarify)
module.exports = router;
