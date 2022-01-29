var mongoose = require("mongoose")
var Schema = mongoose.Schema;


const adminSchema = mongoose.Schema({

  id: {type: Schema.Types.ObjectId},
  name: { type: String, required: true },
  mail: { type: String, required: true },
  password : {type:String, required: true},
  


});



module.exports =  mongoose.model('Admin', adminSchema);


