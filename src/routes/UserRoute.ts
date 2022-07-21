import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/UserController";

const router: Router = Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);

export default router;
