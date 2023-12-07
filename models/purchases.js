import mongoose from "mongoose";

const purchasesSchema = new mongoose.Schema(
    {
      item: {type:String, required: true,}, 
      buyer: {type:String, required: true,}, 
      seller: { type: String, required: true },
      date: { type: Date, required: true },
      status: { type: String, required: true },
      doneOn: { type: Date, default: Date.now, }, 
    },
  { timestamps: true }
);

const Purchases = mongoose.models.Purchases || mongoose.model("Purchases", purchasesSchema);

export default Purchases;
