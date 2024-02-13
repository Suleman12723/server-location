import { Router } from "express";
import Controller from "../controllers/adController.js";

const router = Router();

router.route("/").get(Controller.getAds).post(Controller.uploadAd);

export default router;
