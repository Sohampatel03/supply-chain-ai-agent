import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierForm.css";

const initialState = {
  companyName: "",
  leadTime: "",
  transportMode: "road",
  costAmount: "",
  costCurrency: "INR",
  routeOrigin: "",
  routeDestination: "",
  routeEstimatedDays: "",
  reliability: 80,
  inventory: [{ product: "", quantity: "" }],
};

const SupplierForm = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInventoryChange = (index, e) => {
    const { name, value } = e.target;
    const newInventory = [...form.inventory];
    newInventory[index][name] = value;
    setForm((prev) => ({ ...prev, inventory: newInventory }));
  };

  const addInventoryItem = () => {
    setForm((prev) => ({ ...prev, inventory: [...prev.inventory, { product: "", quantity: "" }] }));
  };

  const removeInventoryItem = (index) => {
    const newInventory = [...form.inventory];
    newInventory.splice(index, 1);
    setForm((prev) => ({ ...prev, inventory: newInventory }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare payload matching the backend schema
    const payload = {
      companyName: form.companyName,
      leadTime: Number(form.leadTime),
      transportMode: form.transportMode,
      cost: {
        amount: Number(form.costAmount),
        currency: form.costCurrency,
      },
      route: {
        origin: form.routeOrigin,
        destination: form.routeDestination,
        estimatedDays: form.routeEstimatedDays ? Number(form.routeEstimatedDays) : undefined,
      },
      reliability: Number(form.reliability),
      inventory: form.inventory.map((item) => ({
        product: item.product,
        quantity: Number(item.quantity),
      })),
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to be logged in to add a supplier.");
        return navigate("/login");
      }

      const res = await fetch("http://localhost:5000/api/suppliers/with-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add supplier");
      }

      const data = await res.json();
      console.log("Supplier added and analyzed:", data);
      alert("Supplier added successfully!");
      navigate("/dash");

    } catch (error) {
      console.error("Error adding supplier:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="supplier-form-container">
      <form className="supplier-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="form-title">Supplier Information</h2>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="e.g. Global Supply Co."
            required
          />
        </div>

        <div className="form-group">
          <label>Lead Time (days)</label>
          <input
            type="number"
            name="leadTime"
            value={form.leadTime}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Transport Mode</label>
          <select name="transportMode" value={form.transportMode} onChange={handleChange}>
            <option value="road">Road</option>
            <option value="air">Air</option>
            <option value="sea">Sea</option>
          </select>
        </div>

        <div className="form-group">
          <label>Cost Amount</label>
          <input
            type="number"
            name="costAmount"
            value={form.costAmount}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Cost Currency</label>
          <input
            type="text"
            name="costCurrency"
            value={form.costCurrency}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Route Origin</label>
          <input
            type="text"
            name="routeOrigin"
            value={form.routeOrigin}
            onChange={handleChange}
            placeholder="e.g. New York, USA"
            required
          />
        </div>

        <div className="form-group">
          <label>Route Destination</label>
          <input
            type="text"
            name="routeDestination"
            value={form.routeDestination}
            onChange={handleChange}
            placeholder="e.g. London, UK"
            required
          />
        </div>

        <div className="form-group">
          <label>Estimated Days</label>
          <input
            type="number"
            name="routeEstimatedDays"
            value={form.routeEstimatedDays}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Reliability Score (0-100)</label>
          <input
            type="number"
            name="reliability"
            value={form.reliability}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <h3>Inventory Items</h3>
        {form.inventory.map((item, index) => (
          <div key={index} className="inventory-item">
            <input
              type="text"
              name="product"
              placeholder="Product Name"
              value={item.product}
              onChange={(e) => handleInventoryChange(index, e)}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleInventoryChange(index, e)}
              min="0"
              required
            />
            {index > 0 && (
              <button type="button" onClick={() => removeInventoryItem(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addInventoryItem}>
          Add Another Item
        </button>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SupplierForm;