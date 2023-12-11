const express = require("express");
const Controller = require("../controllers/controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();
const publicRoute = require("./publicRoute");

router.post("/login", Controller.userLogin);
router.post("/register", Controller.userRegister);
router.post("/googleSignIn", Controller.userGoogleSignIn);

router.use("/public", publicRoute);

// Authen first, then feature
router.use(authentication);

router.get("/lodgings", Controller.readLodging);
router.post("/lodgings", Controller.createLodging);
router.delete("/lodgings/:id", authorization, Controller.deleteLodging);
router.get("/types", Controller.readType);
router.post("/types", Controller.createType);
router.delete("/types/:id", Controller.deleteType);

router.patch("/lodgings/:id", authorization, Controller.editStatus);
router.put("/lodgings/:id", Controller.editLodgings);
router.get("/lodgings/:id", Controller.showIdLodgings);

// Logs
router.get("/logs", Controller.readLog);
router.post("/logs", Controller.postLog);

module.exports = router;
