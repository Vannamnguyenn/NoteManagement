const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const checkToken = require("../middleware/checkToken");

router.get("/:id", checkToken, postController.getAPost);
router.delete("/:id", checkToken, postController.deletePost);
router.put("/:id", checkToken, postController.updatePost);
router.post("/", checkToken, postController.createPost);
router.get("/", checkToken, postController.showPost);

module.exports = router;
