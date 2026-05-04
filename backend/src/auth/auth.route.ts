import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post("/sign-up", register);
authRoute.post("/login", login);
authRoute.post("/refresh", refresh);
authRoute.post("/logout", logout);

export default authRoute;