import User from "../model/userModel.js"

export const create = async (req, res)=>{
    try{
        const {register_number, name, password}= req.body;

        const userExist = await User.findOne({register_number})
        if(userExist){
            return res.status(400).json({message :"Student already Exists."});
        }
        const savedUser = new User({
            register_number:register_number,
            name:name,
            password:password
        })
        
        await savedUser.save();
        res.status(200).json({success:true, message:"Student created successfully",savedUser});

    }catch (error){
        res.status(500).json({error:"Internal Server error." +error});

    }
}
export const fetch = async (req, res)=>{

    try{
        const users = await User.find();
        if(users.length ===0){
            return res.status(404).json({message:"User not found."});
        }
        res.status(200).json(users);



    }catch (error){
        res.status(500).json({error:"Internal Server error."});
    }
};

export const update = async(req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if (!userExist){
            return res.Status(404).json({message:"User Not Found."})
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updateUser);

    } catch (error) {
        res.status(500).json({error:"internal Server error."});

    }
}

export const deleteUser = async (req, res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id: id})
        if (!userExist){
            return res.Status(404).json({message:"User Not Found."})
        }
        await User.findByIdAndDelete(id);
        res.status(201).json ({ message: "User deleted successfully."});

    } catch (error) {
        res.status(500).json({error:"internal Server error."});
    }
}

//login

export const studentLogin = async (req, res) => {
    try {
        const { register_number, password,name} = req.body;

        if (!register_number || !password) {
            return res.status(400).json({ message: "reg number and password are required." });
        }

        const student = await User.findOne({ register_number });
        if (!student) {
            return res.status(404).json({ message: "student not found." });
        }

        // if (User.password !== password) {
        //     return res.status(401).json({ message: "Invalid password." });
        // }

       


        res.status(200).json({success:true,
            message: "Login successful.", 
            student:{
                id:student._id,
                register_number:student.register_number,
                name:student.name,
                password:student.password
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};

//student profile

export const fetchbyuserid = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from request parameters

        // Find user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error." });
    }
};
