import { Router } from "express";
import { getAllUsers, registerUser } from "../controllers/UserController";

const router: Router = Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);

export default router;
