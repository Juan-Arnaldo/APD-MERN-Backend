import express from 'express';
import {register, profile, confirm, authenticateUser, recoverPassword, newPassword, checkToken} from '../controllers/dentistController.js'
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', register);
router.get('/confirm/:token', confirm);
router.post('/login', authenticateUser);
router.post('/recover-password', recoverPassword);
router
    .route('/recover-password/:token')
    .get(checkToken)
    .post(newPassword);

router.get('/profile', checkAuth, profile);

export default router;