const router = require("express").Router();
const xcv = require("./test");
router.get("/test", xcv.testing);
module.exports = router;
