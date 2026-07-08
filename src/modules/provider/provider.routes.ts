const express = require("express");
const {
  addGear,
  updateGear,
  deleteGear,
  getProviderOrders,
  updateOrderStatus,
} = require("../controllers/providerController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("PROVIDER"));

router.post("/gear", addGear);
router.put("/gear/:id", updateGear);
router.delete("/gear/:id", deleteGear);
router.get("/orders", getProviderOrders);
router.patch("/orders/:id", updateOrderStatus);

module.exports = router;
