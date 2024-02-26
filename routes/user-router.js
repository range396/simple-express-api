import { Router } from 'express';
import { createUser } from "../service/user-service.js";

export const router = Router();

router.use((req, res, next) => {  next(); });

// Create User
router.post('/create', async (req, res) => {
    await createUser(req, res);
});