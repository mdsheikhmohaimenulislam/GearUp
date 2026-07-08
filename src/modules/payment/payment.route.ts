const express = require("express");
const { createPayment, confirmPayment, getMyPayments, getPaymentById } = require("../controllers/paymentController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// NOTE: the Stripe webhook route (/confirm) is mounted separately in app.js
// with express.raw() BEFORE the global express.json() parser, because Stripe
// signature verification requires the exact raw request body. It is exported
// here too for documentation purposes but app.js wires the raw-body version.

router.post("/create", protect, authorize("CUSTOMER"), createPayment);
router.get("/", protect, authorize("CUSTOMER"), getMyPayments);
router.get("/:id", protect, getPaymentById);

module.exports = router;
module.exports.confirmPayment = confirmPayment;
