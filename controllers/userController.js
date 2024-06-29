import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (req,res) => {
const {email,password} = req.body;
try {
  const isExist = await User.findOne({email:email});

if(isExist){
  const passMatch= bcrypt.compareSync(password, isExist.password);
  if(!passMatch) return res.status(401).json({
    status:'error',
    message: 'invalid credential'
  });

  const token = jwt.sign({ userId: isExist._id, isAdmin: isExist.isAdmin}, 'toky')



  return res.status(200).json({
    token,
    id: isExist._id,
    email:isExist.email,
    isAdmin:isExist.isAdmin,
    username:isExist.username
  });


}
return res.status(404).json({
  status: 'error',
  message: 'user does not exist'
});
} catch (err) {
  return res.status(400).json(`${err}`);
}

}

export const userSingUp = async (req,res) => {
const {username,email,password} = req.body;

  try { 
    const isExist = await User.findOne({email:email});

    if(isExist) return res.status(400).json({status:'error',
      message:'user already exists'});

      const hashPass= bcrypt.hashSync(password, 10)


    await User.create({
      username,
      email,
      password:hashPass
    });
    return res.status(201).json({
   status: 'success',
   message: 'successfully registered'
    });

  } catch (err) {
    return res.status(400).json(`${err}`);
  }
  
  }

  
export const userUpdate = async (req,res) => {
  const {username,email} = req.body;
  const {id} = req.params;
  
    try { 
      const isExist = await User.findOne({email:email});
  
      if(isExist) {
        await User.findByIdAndUpdate(id,{
        username:req.body?.username || isExist.username,
        email:req.body?.email || isExist.email,
        });
        return res.status(201).json({
          status:'error',
          message:'successfully regestered '});
      }else{
        return res.status(201).json({
          status:'error',
          message:' user does not exist'});
      }
       
       
  
  
    } catch (err) {
      return res.status(400).json(`${err}`);
    }
    
    }