import Patient from "../models/Patient.js";

//Function to create a new patient
const newPatient = async (req, res) => {
    const {email} = req.body;
    const patientExist = await Patient.findOne({email});

    if(patientExist){
        const e = new Error('El Paciente ya existe');
        return res.status(403).json({msg : e.message});
    }

    try {
        const newPatient = new Patient(req.body);
        newPatient.dentist = req.dent._id;
        const savePatient = await newPatient.save();
        res.json(savePatient);
    } catch (error) {
        console.log(error);
    }
}

//Function to get all patients
const getAllPatient = async (req, res) => {
    try {
        const patients = await Patient.find().where('dentist').equals(req.dent);
        res.json(patients);
    } catch (error) {
        res.status(404).json({msg : error.message});
    }
}

//Function to get a particular patient
const getPatient = async (req, res) => {
    const {id} = req.params;

    const patient = await Patient.findById(id);

    if(!patient){
        const e = new Error('El paciente no es encuentra');
        return res.status(403).json({msg : e.message});
    }

    if(patient.dentist._id.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(400).json({msg : e.message});
    }

        res.json(patient);
}

//Function to update a particular patient
const updatePatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);

    if(!patient){
        const e = new Error('El paciente no es encuentra');
        return res.status(403).json({msg : e.message});
    }

    if(patient.dentist._id.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(400).json({msg : e.message});
    }

    patient.name = req.body.name || patient.name;
    patient.lastName = req.body.lastName || patient.lastName;
    patient.email = req.body.email || patient.email;

    try {
        const updatePatient = await patient.save();
        res.json(updatePatient);
    } catch (error) {
        console.log(error);
    }
}

//Function to delete a particular patient
const deletePatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);

    if(!patient){
        const e = new Error('El paciente no es encuentra');
        return res.status(403).json({msg : e.mes});
    }

    if(patient.dentist._id.toString() !== req.dent._id.toString()){
        const e = new Error('Accion no valida');
        return res.status(400).json({msg : e.message});
    }

    try {
        await patient.deleteOne();
        res.json({msg : 'Paciente eliminado correctamente'});
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllPatient,
    newPatient,
    getPatient,
    updatePatient,
    deletePatient
}