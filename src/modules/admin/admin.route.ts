const express = require("express");
const {
  getAllUsers,
  updateUserStatus,
  getAllGearAdmin,
  getAllRentals,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN"));

router.get("/users", getAllUsers);
router.patch("/users/:id", updateUserStatus);
router.get("/gear", getAllGearAdmin);
router.get("/rentals", getAllRentals);

module.exports = router;
