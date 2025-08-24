import React from 'react';

const InventoryCard = ({ supplierData }) => {
  return (
    <section className="inventory-card">
      <h2>Inventory Information</h2>
      <div className="details-grid">
        <div>
          <b>Supplier Name:</b> {supplierData.companyName || "N/A"}
        </div>
        <div>
          <b>Lead Time:</b> {supplierData.leadTime || "N/A"} days
        </div>
        <div>
          <b>Transport Mode:</b> {supplierData.transportMode || "N/A"}
        </div>
        <div>
          <b>Reliability:</b> {supplierData.reliability || "N/A"}%
        </div>
        <div>
          <b>Route:</b> {supplierData.route?.origin || "N/A"} →{" "}
          {supplierData.route?.destination || "N/A"}
        </div>
        <div>
          <b>Estimated Days:</b> {supplierData.route?.estimatedDays || "N/A"}
        </div>
        <div>
          <b>Inventory:</b>
          <ul>
            {supplierData.inventory && supplierData.inventory.length > 0 ? (
              supplierData.inventory.map((item, i) => (
                <li key={i}>
                  {item.product || "Product"} - {item.quantity || "N/A"}
                </li>
              ))
            ) : (
              <li>No inventory data available</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InventoryCard;
