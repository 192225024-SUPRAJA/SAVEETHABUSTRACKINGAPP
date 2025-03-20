import bus from "../model/busModel.js"

export const createbus = async (req, res)=>{
    try{
        const {bus_name,bus_number,driver_name,driver_ph_number}= req.body;

        const busExist = await bus.findOne({bus_number})
        if(busExist){
            return res.status(400).json({message :"bus name already Exists."});
        }
        const savedbus = new bus({
            bus_name:bus_name,
            bus_number:bus_number,
            driver_name:driver_name,
            driver_ph_number:driver_ph_number
        })
        
        await savedbus.save();
        res.status(200).json({success:true, message:"bus created successfully",savedbus});

    }catch (error){
        res.status(500).json({error:"Internal Server error." +error});

    }
}

export const fetchbus = async (req, res)=>{

    try{
        const buses = await bus.find();
        if(buses.length ===0){
            return res.status(404).json({message:"User not found."});
        }
        res.status(200).json(buses);



    }catch (error){
        res.status(500).json({error:"Internal Server error."});
    }
};

export const updatebus = async(req, res)=>{
    try {
        const id = req.params.id;
        const busExist = await bus.findOne({_id:id})
        if (!busExist){
            return res.Status(404).json({message:"bus Not Found."})
        }
        const updatebus = await bus.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updatebus);

    } catch (error) {
        res.status(500).json({error:"internal Server error."});

    }
}

export const deletebus = async (req, res)=>{
    try{
        const id = req.params.id;
        const busExist = await bus.findOne({_id: id})
        if (!busExist){
            return res.Status(404).json({message:"bus Not Found."})
        }
        await bus.findByIdAndDelete(id);
        res.status(201).json ({ message: "bus deleted successfully."});

    } catch (error) {
        res.status(500).json({error:"internal Server error."+error});
    }
}

export const getBusById = async (req, res)=>{
    try{
        const {id} = req.params;
        const busExist = await bus.findById(id)
        if (!busExist){
            return res.Status(404).json({message:"bus Not Found."})
        }
        
        res.status(201).json ({ message: "bus fetched successfully.",busExist});

    } catch (error) {
        res.status(500).json({error:"internal Server error."});
    }
}


export const Schedulebus = async (req, res) => {
    try {
        const { date, bus_name, bus_number } = req.body;

        // Validate input
        if (!date || !bus_name || !bus_number) {
            return res.status(400).json({ message: "All fields (date, bus_name, bus_number) are required." });
        }

        // Check if the bus is already scheduled on the same date
        const busExist = await bus.findOne({ bus_number, date });
        if (busExist) {
            return res.status(400).json({ message: "Bus is already scheduled on this date." });
        }

        // Create a new bus schedule
        const newBus = new bus({
            date,
            bus_name,
            bus_number
        });

        // Save to database
        await newBus.save();

        res.status(201).json({
            success: true,
            message: "Bus scheduled successfully",
            bus: newBus
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};


export const fetchAllScheduleBus = async (req, res) => {
    try {
        // Fetch all bus schedules from the database
        const allBuses = await bus.find();

        if (!allBuses || allBuses.length === 0) {
            return res.status(404).json({ message: "No scheduled buses found." });
        }

        // Respond with the list of buses
        res.status(200).json({ success: true, buses: allBuses });

    } catch (error) {
        res.status(500).json({ error: "Internal Server error. " + error.message });
    }
};



export const updateScheduleBus = async (req, res) => {
    try {
        const { id } = req.params; // Extract bus ID from URL
        const { date, bus_name, bus_number, driver_name, driver_ph_number } = req.body;

        // Find the bus by ID
        const existingBus = await bus.findById(id);
        if (!existingBus) {
            return res.status(404).json({ message: "Scheduled bus not found." });
        }

        // Update the bus details
        existingBus.date = date || existingBus.date;
        existingBus.bus_name = bus_name || existingBus.bus_name;
        existingBus.bus_number = bus_number || existingBus.bus_number;
        existingBus.driver_name = driver_name || existingBus.driver_name;
        existingBus.driver_ph_number = driver_ph_number || existingBus.driver_ph_number;

        // Save the updated bus data
        const updatedBus = await existingBus.save();

        res.status(200).json({
            success: true,
            message: "Bus schedule updated successfully",
            bus: updatedBus
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};


export const deleteScheduleBus = async (req, res) => {
    try {
        const { id } = req.params; // Get bus ID from URL

        // Find the bus by ID
        const buses = await bus.findById(id);
        if (!buses) {
            return res.status(404).json({ message: "Scheduled bus not found." });
        }

        // Delete the bus
        await bus.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Bus schedule deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};