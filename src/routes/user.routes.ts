import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const controller = new UserController();

router.post("/user/create", (req, res) => controller.create(req, res));
router.post("/user/login", (req, res) => controller.login(req, res));

export default router;
