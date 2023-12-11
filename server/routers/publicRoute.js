const router = require("express").Router();
const PublicStatic = require("../controllers/publicStatic");
const authentication = require("../middlewares/authentication");

router.post("/register", PublicStatic.customerRegister);
router.post("/login", PublicStatic.customerLogin);
router.post("/googleLogin", PublicStatic.customerGoogleLogin);
router.get("/lodgings/", PublicStatic.customerGetLodgings);

//! Buat authentication Customer
router.use(authentication);
// Customer dapet Authorization yang akhirnya jadi Auth ID nya dia
router.get("/lodgings/bookmark", PublicStatic.customerGetBookmark);
router.post("/lodgings/bookmark/:id", PublicStatic.customerPostBookmark);
router.get("/lodgings/bookmark/:id", PublicStatic.customerDetailBookmark);

module.exports = router;
