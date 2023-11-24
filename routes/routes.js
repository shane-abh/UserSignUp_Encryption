import express from "express";
import Controller from "../controllers/controller.js";
import { isValid } from "../middlewares/middleware_valid_user.js";
import { test_middleware } from "../middlewares/test_middleware.js";

const router = express.Router();

router.use(test_middleware)

router.get("/test", Controller.test_get);

router.get("/signup", Controller.signup_get);

router.post("/signup", Controller.signup_post);

router.get("/login", Controller.login_get);
router.post("/login", Controller.login_post);

router.get("/dashboard", isValid, Controller.dashboard_get);

router.post("/logout", Controller.logout_post);

export default router;
