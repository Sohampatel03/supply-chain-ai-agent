// controllers/supplierController.js
import Supplier from "../models/Supplier.js";

export const checkSupplier = async (req, res) => {
  const { userId } = req.params;
  try {
    const supplier = await Supplier.findOne({ user: userId }); // correct field
    if (supplier) {
      return res.json({ exists: true, supplier });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
