const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true}
});

//ENcrypt password before saving the user

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//Method to validate password

UserSchema.methods.isValidPassword = function(password){
    return bcrypt.compare(password,this.password);
};

const User = mongoose.model('User',UserSchema);
module.exports = User;