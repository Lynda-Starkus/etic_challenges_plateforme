const bcrypt = require("bcryptjs");
const Admin = require("../models/admins.model");
const generateToken = require("../utils/generateTokens")

const createAdmin = async (req,res) =>{
      
    if (!req.body.mail || !req.body.password ||!req.body.name  ) {
      res.status(400).json({
        message: "parameters can't be empty!"
      })
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt)
    const admin = await Admin.create({
        name: req.body.name,
        mail: req.body.mail,
        password: hashed_password
        
      
    });

    try {

        if (admin) {
            res.status(201).json({
              admin: {
                _id: admin._id,
                name: admin.name,
                mail: admin.mail,
                token: generateToken(admin._id),
              }, 
              message: "Admin request added successfully !"
            })
          } else {
            res.status(400)
            throw new Error('Invalid admin data')
          }
        
        /*await admin.save();
        res.status(201).json({
          message: "Admin request added successfully !"
        })*/
        
    }catch(e){
      res.status(500).json({ error: e.message  })     
    }
  }; 

  const getAllAdmins = async (req,res,next) =>{
    try
    {
      let admins = await Admin.find() ; 
      res.status(200).json(admins);
    }
    catch(e)
    {
      res.status(500).json({ error: e.message  });
    }  
  };


  const authAdmin = async (req, res) => {
    const { mail, password } = req.body

    const admin = await Admin.findOne({ mail })

    const validPassword = await bcrypt.compare(password, admin.password)
    if (admin && validPassword) {
        res.json({
        _id: admin._id,
        name: admin.name,
        mail: admin.mail,
        token: generateToken(admin._id),
        })
    } else {
        res.status(401);
        throw new Error('Invalid mail or password');
    }
} 



const deleteAdmin = async (req, res, next) => {
  try {
      const adminToDelete = await Admin.findById(req.params.id);
      if (!adminToDelete) {
          res.status(404).json({ message: `Admin with id ${req.params.id} not found` });
      } else {
          await Admin.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: `Admin with id ${req.params.id} deleted succefully` });
      }
  } catch (err) {
      res.status(500).json({ err: err.message });
  }
}


const getAdminById = async (req, res) => {
    const admin = await Admin.findById(req.params.id).select('-password')
  
    if (admin) {
      res.json(admin)
    } else {
      res.status(404)
      throw new Error('admin not found')
    }
}

const getAdmin = async (req, res) => {
    const admin = await Admin.findById(req.admin._id)
  
    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        mail: admin.mail,
      })
    } else {
      res.status(404)
      throw new Error('Admin not found')
    }
}

const updateAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id)
  
    if (admin) {
      admin.name = req.body.name || admin.name
      admin.mail = req.body.mail || admin.mail
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(req.body.password, salt)
      }
  
      const updatedAdmin = await admin.save()
  
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        mail: updatedAdmin.mail,
        token: generateToken(updatedAdmin._id),
      })
    } else {
      res.status(404)
      throw new Error('admin not found')
    }
}

  module.exports =  {
    getAllAdmins,
    createAdmin,
    authAdmin,
    deleteAdmin, 
    getAdminById,
    getAdmin,
    updateAdmin,
  }