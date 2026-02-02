import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deliveryPartner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryPartner"
    },
    foodItems:[{
        foodItemId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    status: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);