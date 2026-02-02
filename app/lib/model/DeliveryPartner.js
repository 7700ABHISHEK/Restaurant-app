import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['bike', 'scooter', 'bicycle', 'car']
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    currentOrders: {
        type: Number,
        default: 0
    },
    totalDeliveries: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 5.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model("DeliveryPartner", deliveryPartnerSchema);
export default DeliveryPartner;
