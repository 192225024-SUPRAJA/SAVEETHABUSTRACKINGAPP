import User from "../model/adminModel.js"

export const adminLogin = async (req, res) => {
    try {
        const { email_id, password } = req.body;

        if (!email_id || !password) {
            return res.status(400).json({ message: "email id and password are required." });
        }

        const admin = await User.findOne({ register_number });
        if (!admin) {
            return res.status(404).json({ message: "admin not found." });
        }

        // if (User.password !== password) {
        //     return res.status(401).json({ message: "Invalid password." });
        // }

       


        res.status(200).json({success:true,
            message: "Login successful.", 
            admin:{
                id:admin._id,
                email_id:admin.email_id,
            
                password:admin.password
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};