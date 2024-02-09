const express = require("express");
const authRoute = require("./authRoute.js");
const userRoute = require("./userRoute.js");
const postRoute = require("./postRoute.js");

const router = express.Router();

router.use(`/auth`, authRoute);
router.use(`/users`, userRoute);
router.use(`/posts`, postRoute);

module.exports = router;