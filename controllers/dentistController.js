import Dentist from "../models/Dentist.js";
import generarJWT from "../helpers/generateJWT.js";
import generateTK from "../helpers/generateTK.js";

//function for register a dentist
const register = async (req, res) => {
    const { email } = req.body;
    const userExists = await Dentist.findOne({ email });

    if (userExists) {
        const error = new Error('Usuario ya existente');
        return res.status(400).json({ msg: error.message })
    }
    try {
        const dentist = new Dentist(req.body);
        const dentistSave = await dentist.save();

        res.json({ msg: 'Usuario Registrado' });
    } catch (error) {
        console.log(error.message);
    }
}


const profile = (req, res) => {

    const { dent } = req;

    res.send({ dent });
}

//function for confirm a dentist
const confirm = async (req, res) => {
    const { token } = req.params;

    const userConfirm = await Dentist.findOne({ token });

    if (!userConfirm) {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message });
    } else {
        try {
            userConfirm.token = null;
            userConfirm.confirmed = true;
            await userConfirm.save();

            res.json({ msg: 'Usuario confirmado' });
        } catch (error) {
            console.log(error.message);
        }
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    const userConfirm = await Dentist.findOne({ email });

    if (!userConfirm) {
        const error = new Error('El usuario no existe');
        return res.status(403).json({ msg: error.message });
    } 

    if(!userConfirm.confirmed){
        const error = new Error('La cuenta no fue confirmada');
        return res.status(403).json({msg : error.message});
    }

    if(await userConfirm.authenticatePass(password)){
        res.json({token: generarJWT(userConfirm.id)})
    }else{
        const error = new Error('El password es incorrecto');
        res.status(403).json({msg : error.message});
    }
}

const recoverPassword = async (req, res) => {
    const { email } = req.body
    const userExist = await Dentist.findOne({email});

    if(!userExist){
        const e = new Error('El usuario no existe');
        res.status(400).json({msg : e.message});
    }

    try {
        userExist.token = generateTK()
        await userExist.save();
        res.json({msg : 'Se le envio un correo con las instrucciones'});
    } catch (error) {
        console.log(error.message);
    }
}

const checkToken = async (req, res) => {
    const {token} = req.params;

    const authToken = await Dentist.findOne({token});

    if(!authToken){
        const e = new Error('Token no valido');
        res.status(400).json({msg : e.message});
    }else{
        res.json({msg : 'Token valido'});
    }
}

const newPassword = async (req, res) => {
    const {token} = req.params;
    const {pass} = req.body;

    const authToken = await Dentist.findOne({token});

    if(!authToken){
        const e = new Error('Token no valido');
        res.status(401).json({msg : e.message});
    }

    try {
        authToken.token = null;
        authToken.password = pass;
        await authToken.save();
        res.json({msg : 'Contrasenia cambiada correctamente'});
    } catch (error) {
        res.status(401).json({msg : error.message});
    }
}

export {
    register,
    profile,
    confirm,
    authenticateUser,
    recoverPassword,
    newPassword,
    checkToken
}