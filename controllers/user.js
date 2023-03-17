import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Profile from '../models/getUser.js'

export const signin = async (req, res)=> {
   const { email, password } = req.body;
   try {
       const existingUser = await Profile.findOne({ email });
       if(!existingUser) return res.status(404).json({ message: "user doesn't exist" });

       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

       if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

       const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'mysecretkey', {expiresIn: "1d"});

       res.status(200).json({ token: `Bearer ${token}` });


   } catch (error) {
       res.status(500).json({ message: "Something went wrong" });
   }


}


export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "User already exists" });
   // if(password !== confirmPassword) return res.status(400).json({ message: "Passwords didn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const profile = await Profile.create({name: `${firstName} ${lastName}`, email, password: hashedPassword})

    const token = jwt.sign({ email: profile.email, id: profile._id }, 'mysecretkey', {expiresIn: "1d"});
    
    res.status(200).json({ profile, token: `Bearer ${token}` });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}