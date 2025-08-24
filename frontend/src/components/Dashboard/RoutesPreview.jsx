import React from 'react';

const RoutesPreview = ({ supplierData }) => {
  return (
    <section className="map-preview-full">
      <h2>Route Map Preview</h2>
      <div className="dummy-map">
        <div className="map-marker" style={{ left: "30%", top: "60%" }}></div>
        <div className="map-marker" style={{ left: "70%", top: "30%" }}></div>
        <span className="map-label">
          {supplierData?.route?.origin || "Origin"} →{" "}
          {supplierData?.route?.destination || "Destination"}
        </span>
      </div>
      <div style={{ marginTop: "1.5rem", color: "#274060", fontWeight: 500 }}>
        <b>Route Analysis:</b> No major traffic or roadblocks detected. Route
        is clear.
      </div>
    </section>
  );
};

export default RoutesPreview;
