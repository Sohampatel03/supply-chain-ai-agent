import React, { useState } from "react";

const DynamicMap = () => {
  const [origin, setOrigin] = useState("Medicaps University, Indore");
  const [destination, setDestination] = useState("Devi Ahilya Vishwavidyalaya, Indore");
  
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    origin
  )}+to+${encodeURIComponent(destination)}&output=embed`;
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dynamic Route Map</h2>
      
      {/* Map */}
      <div style={styles.mapContainer}>
        <iframe
          width="100%"
          height="400"
          style={styles.iframe}
          loading="lazy"
          allowFullScreen
          src={mapSrc}
          title="Dynamic Map"
        ></iframe>
      </div>
      
      {/* Horizontal Route Preview */}
      <section style={styles.previewSection}>
        <h3 style={styles.subHeading}>Route Preview</h3>
        <div style={styles.horizontalLine}>
          {/* Origin */}
          <div style={styles.stop}>
            <div style={{ ...styles.circle, background: "red" }}></div>
            <span style={styles.label}>{origin}</span>
          </div>
          
          {/* Connector Line */}
          <div style={styles.connector}></div>
          
          {/* Destination */}
          <div style={styles.stop}>
            <div style={{ ...styles.circle, background: "green" }}></div>
            <span style={styles.label}>{destination}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1.5rem",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    color: "#333",
  },
  mapContainer: {
    marginBottom: "2rem",
    borderRadius: "12px",
    overflow: "hidden",
  },
  iframe: {
    border: "0",
  },
  previewSection: {
    textAlign: "center",
  },
  subHeading: {
    marginBottom: "1.2rem",
    color: "#444",
    fontSize: "1.3rem",
  },
  horizontalLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    margin: "2rem auto",
    maxWidth: "90%",
  },
  stop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
  },
  circle: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid #333",
    marginBottom: "0.5rem",
  },
  connector: {
    flex: 1,
    height: "3px",
    background: "#0077cc",
    margin: "0 1rem",
  },
  label: {
    fontSize: "0.95rem",
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
};

export default DynamicMap;