import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    newappointment,
    getappointment,
    getAllappointment,
    updateappointment,
    deleteappointment
} from '../controllers/appointmentController.js'

const router = express.Router();


router
    .route('/')
    .get(checkAuth, getAllappointment)
    .post(checkAuth, newappointment);


router 
    .route('/:id')
    .get(checkAuth, getappointment)
    .put(checkAuth, updateappointment)
    .delete(checkAuth, deleteappointment);


export default router;