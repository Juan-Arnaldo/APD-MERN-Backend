import  express  from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import dentistRouter from './routes/dentistRoutes.js'
import patientRouter from './routes/patientRoutes.js'
import appoinmentRouter from './routes/appoimentRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

app.use('/api/dentist', dentistRouter);
app.use('/api/patient', patientRouter);
app.use('/api/appoiment', appoinmentRouter);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor conectado correctamente en el puerto: ${PORT}`);
})


export default connectDB;