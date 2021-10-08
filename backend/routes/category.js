const express = require("express");
const router = express.Router();
const db = require("../database/db");
const categoryController = require("../controllers/categoryController");
const { authenticateToken } = require('../services/authService');

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

router.post("/",authenticateToken, categoryController.insert_category);
router.put("/:catId",authenticateToken, categoryController.update_category);
router.delete("/:catId",authenticateToken, categoryController.delete_category);

module.exports = router;
