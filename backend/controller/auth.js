import { User } from "../model/user.js";
import bcrypt from 'bcrypt'

// Register function
export const Register = async(req, res,) => {
    const { name, email, password,phone,Address } = req.body;
   
    try {
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(501).json({
                success: false,
                message: "User already exists...."
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpashword = await bcrypt.hash(password, salt)
       
        await User.create({
            name: name,
            email: email,
            password: hashpashword,
            phone,
            Address,
            file:req.body.images,
            type: 'user'
        });
        res.status(201).json({
            message: "Register Successfully..",
            success: true,
            User,
        })
    } catch (error) {
        console.log("error", error)
    }
}

// Login function
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No User Found with email " + email,
                status:401
            })
        }
        const userpassword = await bcrypt.compare(password, user.password);
        if (!userpassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong Credentials..",
                status:401
            })
        }
        res.status(201).json({
            success: true,
            message: "Logged in Successfully..",
            user,
            status:201
        })
    } catch (error) {
        console.log("error", error);
    }
}

