import express from 'express';
import {  userLogin, userSingUp } from '../controllers/userController.js';
import Joi from 'joi';
import validator from 'express-joi-validation';



const router = express.Router();

const valid = validator.createValidator({});


const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().max(20).min(6).required()
  });

  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(20).min(6).required()
    });


  const handleAll = (req,res) => {
      return res.status(405).json({status:'error', message:'method not allowed'})
  }

router.route('/')
.get(userLogin);

router.route('/login')
.post(valid.body(loginSchema), userLogin).all(handleAll);

router.route('/singup')
.post(valid.body(userSchema),userSingUp).all(handleAll);


router.route('/profile')
.patch().all(handleAll);




export default router;