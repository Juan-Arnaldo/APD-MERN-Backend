import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    newAppoiment,
    getAppoiment,
    getAllAppoiment,
    updateAppoiment,
    deleteAppoiment
} from '../controllers/appoimentController.js'

const router = express.Router();


router
    .route('/')
    .get(checkAuth, getAllAppoiment)
    .post(checkAuth, newAppoiment);


router 
    .route('/:id')
    .get(checkAuth, getAppoiment)
    .put(checkAuth, updateAppoiment)
    .delete(checkAuth, deleteAppoiment);


export default router;