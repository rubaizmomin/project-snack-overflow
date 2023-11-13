const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 32,
        minlength: 3, 
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: true,
        maxlength: 32,
        minlength: 6
    },
    role: {
        type: Number,
        default: 'user'
    },
}, {timestamps: true});

// encrypt password before saving to database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }   
    this.password = await bcrypt.hash(this.password, 10);
}); 

// return a JWT token 
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

export default mongoose.model('User', userSchema);