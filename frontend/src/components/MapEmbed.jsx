// import React, { useState } from "react";

// const DynamicMap = () => {
//   const [origin, setOrigin] = useState("Medicaps University, Indore");
//   const [destination, setDestination] = useState("Devi Ahilya Vishwavidyalaya, Indore");

//   const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(origin)}+to+${encodeURIComponent(destination)}&output=embed`;

//   return (
//     <div>
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Origin"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//           style={{ marginRight: "0.5rem" }}
//         />
//         <input
//           type="text"
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>

//       <iframe
//         width="600"
//         height="450"
//         style={{ border: 0 }}
//         loading="lazy"
//         allowFullScreen
//         src={mapSrc}
//         title="Dynamic Map"
//       ></iframe>
//     </div>
    
//   );
// };

// export default DynamicMap;
import React, { useState } from "react";

const DynamicMap = () => {
  const [origin, setOrigin] = useState("Medicaps University, Indore");
  const [destination, setDestination] = useState("Devi Ahilya Vishwavidyalaya, Indore");

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(origin)}+to+${encodeURIComponent(destination)}&output=embed`;

  return (
    <div>
      {/* Input fields */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Embedded Google Map */}
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        title="Dynamic Map"
      ></iframe>

      {/* Map Preview */}
      <section className="map-preview">
        <h2>Route Map Preview</h2>
        <div className="dummy-map" style={{ position: "relative", height: "300px", background: "#eee" }}>
          <div className="map-marker" style={{ position: "absolute", left: "30%", top: "60%", width: "10px", height: "10px", background: "red", borderRadius: "50%" }}></div>
          <div className="map-marker" style={{ position: "absolute", left: "70%", top: "30%", width: "10px", height: "10px", background: "green", borderRadius: "50%" }}></div>
          <span className="map-label">{/* supplier.route || */ 'Route not specified'}</span>
        </div>
      </section>
    </div>
  );
};

export default DynamicMap;
