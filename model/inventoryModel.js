import mongoose from "mongoose";
const inventorySchema = mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "B+", "A-", "B-", "O+", "AB+", "AB-"],
    },
    quantity: {
      type: Number,
      required: [true, "blood qunatity is required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Organization is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: function () {
        this.inventoryType === "out";
      },
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: function () {
        this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

const InventoryModel = mongoose.model("Inventories", inventorySchema);
export default InventoryModel;
