import moment from "moment";
import mongoose from "mongoose";
const appoinmentSchema = mongoose.Schema(
    {
        date : {
            type : Date,
            require: true,
        },

        comment : {
            type : String,
            require : true,
        },

        dentist : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Dentist',
        },

        patient : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Patient' 
        }
    }
)

const appoinment = mongoose.model('appoiment', appoinmentSchema);

export default appoinment;