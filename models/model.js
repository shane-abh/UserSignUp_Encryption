import mongoose from "mongoose";
import {} from 'dotenv/config';

export const uri = process.env.MONGO_URI;

  
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      "===================Connected to sign up mongodb successfully=================="
    )
  )
  .catch((err) => console.log(`Sorry, you have an err ${err}`));


  const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pwd:{type: String, required: true},
  })

  const userModel = mongoose.model('Delta_users', userSchema);

  export default userModel;