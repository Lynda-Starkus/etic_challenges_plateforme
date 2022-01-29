import {mongoose} from 'mongoose'
var Schema = mongoose.Schema;


const challengeSchema = mongoose.Schema({

  id: {type: Schema.Types.ObjectId, required: true},
  titre : {type:String, required: true},
  category : {type:String, required: true},
  points : {type:Number, required: true},
  difficulty : {type:String, required: true},
  description : {type:String, required: true},



});

export default mongoose.model('Challenge', challengeSchema);