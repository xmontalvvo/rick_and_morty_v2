const { Router } = require("express");
const router = Router()
const characters = require("./characters.js")
const favorites = require("./favorites.js")

router.use("/", characters);
router.use("/", favorites);

module.exports = router;