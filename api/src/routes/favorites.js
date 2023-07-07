const { Router } = require("express");
const router = Router();
const { deleteFav, postFav } = require("../controllers/favorites");

router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;
