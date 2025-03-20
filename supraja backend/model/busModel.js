import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    date: {
        type: String, 
        required: false
    },
    bus_name: {
        type: String,
        required: true
    },
    bus_number: {
        type: String,
        required: true
    },
    driver_name: {
        type: String,
        required: false
    },
    driver_ph_number: {
        type: String,
        required: false
    }
});

export default mongoose.model("bus", busSchema);
