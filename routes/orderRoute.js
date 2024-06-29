import express from 'express';
import { addOrder, getAllOrder, getOrderById } from '../controllers/orderController.js';
import { adminCheck, userCheck } from '../middleware/checkUser.js';


const router = express.Router();


  const handleAll = (req,res) => {
      return res.status(405).json({status:'error', message:'method not allowed'})
  }

router.route('/')
.get(userCheck, adminCheck, getAllOrder).post(userCheck, addOrder).all(handleAll);


router.route('/:id')
.get(userCheck, getOrderById).all(handleAll);





export default router;