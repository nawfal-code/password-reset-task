import Users from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/mailer.js";


// register User

export const registerUser=async (req,res)=>{
try {
 const { name = "", email = "", password = "" } = req.body;
if (!name.trim() || !email.trim() || !password.trim()) {
  return res.status(400).json({ message: "All fields are required" });
}
const hashedPassword=await bcrypt.hash(password,10);
const newUser=new Users({name,email,password:hashedPassword});
await newUser.save();

 return res.status(201).json({message:"User Registered Succesfully"});
} 
catch (error) {
    if(error.code === 11000){
       return res.status(400).json({message:"Email already exists"});
    }
 return res.status(500).json({message:error.message});
}

}

// Login User

export const logInUser = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Users.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// forgot password
 

export const forgotPassword = async (req, res) => {
  try {
    const { email = "" } = req.body;

    if (!email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    // const normalizedEmail = email.trim().toLowerCase();
    const user = await Users.findOne({ email: email });

     if(!user){
            return res.status(404).json({ message: "user not found , enter valid email" });
     }


    // const token = jwt.sign(
    //   { _id: user._id },
    //   process.env.SECRET_KEY,
    //   { expiresIn: "1h" }
    // );

    // const resetLink = `http://localhost:5173/password-reset/${token}`;

    await sendEmail(
       email,
      "Password Reset Link",
     "check check"  
    );
// `Click the link to reset your password: ${resetLink}`
    return res.status(200).json({
      message: "a reset link sent to email succesfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// reset password

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password = "" } = req.body;

    if (!password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.findByIdAndUpdate(decoded._id, { password: hashedPassword });

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};







