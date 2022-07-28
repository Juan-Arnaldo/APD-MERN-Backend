import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generateTK from '../helpers/generateTK.js';

const dentistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: null,
        trim: true
    },

    token: {
        type : String,
        default : generateTK()
    },

    confirmed: {
        type: Boolean,
        default: false
    }
});

dentistSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);

})

dentistSchema.methods.authenticatePass = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password);
}

const dentist = mongoose.model('dentist', dentistSchema);

export default dentist;