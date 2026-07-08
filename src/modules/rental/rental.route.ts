const express = require("express");
const { createRental, getMyRentals, getRentalById } = require("../controllers/rentalController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/", authorize("CUSTOMER"), createRental);
router.get("/", authorize("CUSTOMER"), getMyRentals);
router.get("/:id", getRentalById); // ownership/admin check happens inside controller

module.exports = router;
