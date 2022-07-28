import jwt from 'jsonwebtoken';
import Dentist from '../models/Dentist.js';

const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    } {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.dent = await Dentist.findById(decoded.id).select("-password -token -confirmed");

            return next();

        } catch (error) {
            const e = new Error('Token no valido');
            res.status(403).json({msg : e.message});
        }
    }

    if(!token){
        const e = new Error('Token inexistente');
        res.status(403).json({msg : e.message});
    }

    next();
};

export default checkAuth;