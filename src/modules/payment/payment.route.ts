import { Router } from "express";


const router = Router();

// NOTE: the Stripe webhook route (/confirm) is mounted separately in app.js
// with express.raw() BEFORE the global express.json() parser, because Stripe
// signature verification requires the exact raw request body. It is exported
// here too for documentation purposes but app.js wires the raw-body version.

router.post("/create", );
router.get("/", );
router.get("/:id",);


export const paymentRouter = router