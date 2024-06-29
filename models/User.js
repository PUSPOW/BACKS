import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
username:{
type: String,
require: [true,'username is required']
},
email:{
  type: String,
  require: true
},
password:{
  type: String,
  require: true
},
isAdmin: {
  type: Boolean,
  default: false
}
}, { timestamps: true });

const User = mongoose.model('User',userSchema);


export default User;