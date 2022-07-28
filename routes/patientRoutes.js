import express from 'express';
import checkAuth from '../middleware/authMiddleware.js'
import { getAllPatient,
         newPatient, 
         getPatient,
         updatePatient,
         deletePatient } from '../controllers/patientController.js';

const router = express.Router();

router
    .route('/')
    .get(checkAuth, getAllPatient)
    .post(checkAuth, newPatient);

router
    .route('/:id')
    .get(checkAuth, getPatient)
    .put(checkAuth, updatePatient)
    .delete(checkAuth, deletePatient)


export default router;