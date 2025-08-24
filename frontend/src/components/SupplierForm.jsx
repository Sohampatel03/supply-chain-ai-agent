import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierForm.css";

const initialState = {
  supplierName: "",
  contactNumber: "",
  itemName: "",
  route: "",
  deliveryDate: "",
  deliveryTime: "",
  dealPrice: "",
  inventoryInfo: "",
};

const InventoryForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    } else {
      localStorage.setItem('inventoryForm', JSON.stringify(form));
      navigate('/dashboard');
    }
  };

  return (
    <div className="inventory-form-container">
      <form className="inventory-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="form-title">Inventory Information</h2>
        <div className="form-group">
          <label htmlFor="supplierName">Supplier Name</label>
          <input
            type="text"
            id="supplierName"
            name="supplierName"
            placeholder="e.g. Abhay Singh"
            value={form.supplierName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="e.g. 9876543210"
            value={form.contactNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10,}"
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="e.g. Steel Rods"
            value={form.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="route">Route</label>
          <input
            type="text"
            id="route"
            name="route"
            placeholder="e.g. Mumbai → Pune"
            value={form.route}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={form.deliveryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryTime">Delivery Time</label>
            <input
              type="time"
              id="deliveryTime"
              name="deliveryTime"
              value={form.deliveryTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dealPrice">Product Deal Price</label>
          <input
            type="number"
            id="dealPrice"
            name="dealPrice"
            placeholder="e.g. 50000"
            value={form.dealPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inventoryInfo">Inventory Details</label>
          <textarea
            id="inventoryInfo"
            name="inventoryInfo"
            placeholder="e.g. 100 units, batch #A123"
            value={form.inventoryInfo}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
