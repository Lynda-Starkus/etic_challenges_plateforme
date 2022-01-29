import {mongoose} from 'mongoose'
var Schema = mongoose.Schema;


const userSchema = mongoose.Schema({

  id: {type: Schema.Types.ObjectId},
  name : {type:String, required: true},
  email : {type:String, required: true},
  password : {type:String, required: true},
  globalScore : {type:Number, required: true},
  challengesTrack :  [ 
    {
      idChallenge : {type:Schema.Types.ObjectId, required: true,ref:'Challenge'},
      note : {type:Number},
      submissionDate : {type:Date},
      urlSubmission : {type:String},
      state : {type:String},

    }
  ], 



});

export default mongoose.model('User', userSchema);