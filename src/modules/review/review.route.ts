const express = require("express");
const { createReview } = require("../controllers/reviewController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize("CUSTOMER"), createReview);

module.exports = router;
