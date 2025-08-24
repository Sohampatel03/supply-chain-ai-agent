import React from 'react';

const MapPreview = ({ supplierData }) => {
  return (
    <section className="map-preview">
      <h2>Route Map Preview</h2>
      <div className="dummy-map">
        <div
          className="map-marker origin-marker"
          style={{ left: "20%", top: "70%" }}
        >
          <div className="marker-label origin-label">
            {supplierData.route?.origin || "Origin"}
          </div>
        </div>
        <div
          className="map-marker destination-marker"
          style={{ left: "75%", top: "25%" }}
        >
          <div className="marker-label destination-label">
            {supplierData.route?.destination || "Destination"}
          </div>
        </div>
        <div className="route-line"></div>
        <div className="map-info">
          <div className="route-distance">🚛 Distance: ~1,400 km</div>
          <div className="route-time">
            ⏱️ Est. Time: {supplierData.route?.estimatedDays || "N/A"} days
          </div>
          <div className="route-mode">
            🛣️ Mode: {supplierData.transportMode || "N/A"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
