const express = require("express");
const { getAllGear, getGearById, getCategories } = require("../controllers/gearController");

const router = express.Router();

router.get("/gear", getAllGear);
router.get("/gear/:id", getGearById);
router.get("/categories", getCategories);

module.exports = router;
