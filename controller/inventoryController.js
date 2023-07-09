import UsersModel from "../model/userModel.js";
import InventoryModel from "../model/inventoryModel.js";

export const createInventoryController = async (req, res) => {
  try {
    //Validations
    const { email, inventoryType } = req.body;
    const user = await UsersModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if (inventoryType === "in" && user.role !== "donor") {
      throw new Error("Not a donor type");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
    }
    //Saving record in database
    const inventoryRecord = new InventoryModel(req.body);
    await inventoryRecord.save();
    return res.status(201).send({
      success: true,
      message: "Inventory created",
      inventoryRecord,
    });
  } catch (error) {
    console.log("Error in create Inventory controller", error);
    return res.status(500).send({
      success: false,
      message: "Failed to create inventory",
      error,
    });
  }
};

//GET INVENTORY RECORDS
export const getInventoryController = async (req, res) => {
  try {
    const records = await InventoryModel.find({
      organization: req.body.userId,
    })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      records,
    });
  } catch (error) {
    console.log("Error in get inventory controller", error);
    return res.status(500).send({
      success: false,
      message: "Failed to retrieves records",
      error,
    });
  }
};
