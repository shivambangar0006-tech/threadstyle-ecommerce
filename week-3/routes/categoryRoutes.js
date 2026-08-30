const express = require("express");
const controller = require("../controllers/categoryController");

const router = express.Router();

router.get("/", controller.getCategories);
router.post("/", controller.createCategory);

module.exports = router;
