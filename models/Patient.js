import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        dentist: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Dentist',
        }

    },
    {
        timestamps : true,
    }
)

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;