import express from "express"
import { sendMsg } from "../controllers/Msgcontro.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id", protectRoute ,sendMsg) // before running this sendMsg func. we will check if user is auth. by protectRoute middleware 

export default router; 