var express = require('express');
var router = express.Router();
var {
    getLoginPage,
    doLogin,
    addproductPage,
    addProduct

} = require("../controllers/adminController")
/* GET users listing. */
router.get('/',getLoginPage)
router.post('/login',doLogin)

router.get('/addProduct',addproductPage)// get add produc page
router.post('/addProduct',addProduct)
module.exports = router;
