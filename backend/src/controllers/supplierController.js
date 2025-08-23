import Supplier from "../models/Supplier.js";

// ➕ Add Supplier
export const addSupplier = async (req, res) => {
  try {
    const { name, location, reliabilityScore, leadTime, cost } = req.body;

    const supplier = await Supplier.create({
      user: req.user._id, // current logged-in user ka data link
      name,
      location,
      reliabilityScore,
      leadTime,
      cost,
    });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📂 Get All Suppliers for Logged-in User
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Delete Supplier
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    if (supplier.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await supplier.deleteOne();
    res.json({ message: "Supplier removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
