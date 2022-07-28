import moment from "moment";
import Appoinment from "../models/appointment.js";
import Patient from "../models/Patient.js";

//Function to create new appoiment
const newAppoiment = async (req, res) => {
    const { date, id } = req.body;

    const appoimentExist = await Appoinment.findOne({date}).where('dentist').equals(req.dent);

    // console.log(date);
    // var aux = moment(date).add(59, 'minutes').parseZone();
    // var aux2 = moment(date).subtract(59, 'minutes').parseZone();
    // console.log(aux); 
    // console.log(aux2); 

    // if(!moment(date).isBetween(aux, aux2)){
    //     console.log('es invalido');
    // }

    if(appoimentExist){
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
        const appoiment = new Appoinment(req.body);
        appoiment.patient = patient._id;
        appoiment.dentist = req.dent._id;
        const saveAppoiment = await appoiment.save();
        res.json(saveAppoiment);
    } catch (error) {
        console.log(error.message);
    }
};

//Function to get all appoiments
const getAllAppoiment = async (req, res) => {
    try {
        const appoiments = await Appoinment.find().where('dentist').equals(req.dent);
        res.json(appoiments)
    } catch (error) {
        res.status(404).json({msg : error.message});
    }
};

//Function to get a particular appoiment
const getAppoiment = async (req, res) => {
    const {id} = req.params
    const appoiment = await Appoinment.findById(id);

    if(!appoiment){
        const e = new Error('No existe el turno buscado');
        return res.status(400).json({msg : e.message});
    }

    if(appoiment.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(400).json({msg : e.message});
    }

    try {
        res.json(appoiment);
    } catch (error) {
        console.log(error.message);
    }
};

//function to update a particular appoiment
const updateAppoiment = async (req, res) => {
    const {id} = req.params
    const appoiment = await Appoinment.findById(id)

    if(!appoiment){
        const e = new Error('No existe el turno buscado');
        res.status(403).json({msg : e.message});
    }

    if(appoiment.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        res.status(403).json({msg : e.message});
    }

    appoiment.date = req.body.date || appoiment.date;
    appoiment.comment = req.body.comment || appoiment.comment;

    try {
        const updateAppoiment = await appoiment.save()
        res.json(updateAppoiment);
    } catch (error) {
        console.log(error.message);
    }
};

//function to delete a particular appoiment
const deleteAppoiment = async (req, res) => {
    const {id} = req.params
    const appoiment = await Appoinment.findById(id);

    if(!appoiment){
        const e = new Error('No existe el turno buscado');
        return res.status(403).json({msg : e.message});
    }

    if(appoiment.dentist.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(403).json({msg : e.message});
    }

    try {
        appoiment.deleteOne();
        res.json({msg : 'Turno eliminado correctamente'});
    } catch (error) {
        console.log(error,message);
    }
};

export {
    newAppoiment,
    getAppoiment,
    getAllAppoiment,
    updateAppoiment,
    deleteAppoiment
}