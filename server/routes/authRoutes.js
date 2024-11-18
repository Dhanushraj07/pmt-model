const express = require("express");
const router = express.Router();
const { signup, signin,punchIn,punchOut } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/punchin", punchIn);
router.post("/punchout", punchOut);

module.exports = router;
