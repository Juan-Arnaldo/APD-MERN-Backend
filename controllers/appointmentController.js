import appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";

//Function to create new appointment
const newappointment = async (req, res) => {
    const { date, id } = req.body;

    const appointmentExist = await appointment.findOne({date}).where('dentist').equals(req.dent);

    // console.log(date);
    // var aux = moment(date).add(59, 'minutes').parseZone();
    // var aux2 = moment(date).subtract(59, 'minutes').parseZone();
    // console.log(aux); 
    // console.log(aux2); 

    // if(!moment(date).isBetween(aux, aux2)){
    //     console.log('es invalido');
    // }

    if(appointmentExist){
        const e = new Error('Esa hora ya se encuentra ocupada');
        return res.status(400).json({msg : e.message});
    }

    const patient = await Patient.findById(id)

    if(!patient){
        const e = new Error('El paciente no existe');
        return res.status(400).json({msg : e.message});
    }

    if(patient.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(400).json({msg : e.message});
    }

    try {
        const appointment = new appointment(req.body);
        appointment.patient = patient._id;
        appointment.dentist = req.dent._id;
        const saveappointment = await appointment.save();
        res.json(saveappointment);
    } catch (error) {
        console.log(error.message);
    }
};

//Function to get all appointments
const getAllappointment = async (req, res) => {
    try {
        const appointments = await appointment.find().where('dentist').equals(req.dent);
        res.json(appointments)
    } catch (error) {
        res.status(404).json({msg : error.message});
    }
};

//Function to get a particular appointment
const getappointment = async (req, res) => {
    const {id} = req.params
    const appointment = await appointment.findById(id);

    if(!appointment){
        const e = new Error('No existe el turno buscado');
        return res.status(400).json({msg : e.message});
    }

    if(appointment.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(400).json({msg : e.message});
    }

    try {
        res.json(appointment);
    } catch (error) {
        console.log(error.message);
    }
};

//function to update a particular appointment
const updateappointment = async (req, res) => {
    const {id} = req.params
    const appointment = await appointment.findById(id)

    if(!appointment){
        const e = new Error('No existe el turno buscado');
        res.status(403).json({msg : e.message});
    }

    if(appointment.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        res.status(403).json({msg : e.message});
    }

    appointment.date = req.body.date || appointment.date;
    appointment.comment = req.body.comment || appointment.comment;

    try {
        const updateappointment = await appointment.save()
        res.json(updateappointment);
    } catch (error) {
        console.log(error.message);
    }
};

//function to delete a particular appointment
const deleteappointment = async (req, res) => {
    const {id} = req.params
    const appointment = await appointment.findById(id);

    if(!appointment){
        const e = new Error('No existe el turno buscado');
        return res.status(403).json({msg : e.message});
    }

    if(appointment.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(403).json({msg : e.message});
    }

    try {
        appointment.deleteOne();
        res.json({msg : 'Turno eliminado correctamente'});
    } catch (error) {
        console.log(error,message);
    }
};

export {
    newappointment,
    getappointment,
    getAllappointment,
    updateappointment,
    deleteappointment
}