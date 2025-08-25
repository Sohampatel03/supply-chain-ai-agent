// // import React, { useState } from "react";

// // const DynamicMap = () => {

// //   const [origin, setOrigin] = useState("Medicaps University, Indore");
// //   const [destination, setDestination] = useState("Devi Ahilya Vishwavidyalaya, Indore");

// //   const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
// //     origin
// //   )}+to+${encodeURIComponent(destination)}&output=embed`;

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.heading}>Dynamic Route Map</h2>

// //       {/* Map */}
// //       <div style={styles.mapContainer}>
// //         <iframe
// //           width="100%"
// //           height="400"
// //           style={styles.iframe}
// //           loading="lazy"
// //           allowFullScreen
// //           src={mapSrc}
// //           title="Dynamic Map"
// //         ></iframe>
// //       </div>

// //       {/* Horizontal Route Preview */}
// //       <section style={styles.previewSection}>
// //         <h3 style={styles.subHeading}>Route Preview</h3>
// //         <div style={styles.horizontalLine}>
// //           {/* Origin */}
// //           <div style={styles.stop}>
// //             <div style={{ ...styles.circle, background: "red" }}></div>
// //             <span style={styles.label}>{origin}</span>
// //           </div>

// //           {/* Connector Line */}
// //           <div style={styles.connector}></div>

// //           {/* Destination */}
// //           <div style={styles.stop}>
// //             <div style={{ ...styles.circle, background: "green" }}></div>
// //             <span style={styles.label}>{destination}</span>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     maxWidth: "800px",
// //     margin: "2rem auto",
// //     padding: "1.5rem",
// //     borderRadius: "12px",
// //     background: "#fff",
// //     boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   heading: {
// //     textAlign: "center",
// //     marginBottom: "1.5rem",
// //     fontSize: "1.8rem",
// //     color: "#333",
// //   },
// //   mapContainer: {
// //     marginBottom: "2rem",
// //     borderRadius: "12px",
// //     overflow: "hidden",
// //   },
// //   iframe: {
// //     border: "0",
// //   },
// //   previewSection: {
// //     textAlign: "center",
// //   },
// //   subHeading: {
// //     marginBottom: "1.2rem",
// //     color: "#444",
// //     fontSize: "1.3rem",
// //   },
// //   horizontalLine: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     position: "relative",
// //     margin: "2rem auto",
// //     maxWidth: "90%",
// //   },
// //   stop: {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     width: "40%",
// //   },
// //   circle: {
// //     width: "18px",
// //     height: "18px",
// //     borderRadius: "50%",
// //     border: "2px solid #333",
// //     marginBottom: "0.5rem",
// //   },
// //   connector: {
// //     flex: 1,
// //     height: "3px",
// //     background: "#0077cc",
// //     margin: "0 1rem",
// //   },
// //   label: {
// //     fontSize: "0.95rem",
// //     fontWeight: "bold",
// //     color: "#222",
// //     textAlign: "center",
// //   },
// // };

// // export default DynamicMap;
// import { Loader } from "lucide-react";
// import React, { useState, useEffect } from "react";

// const DynamicMap = () => {
//   const [origin, setOrigin] = useState("Medicaps University, Indore");
//   const [destination, setDestination] = useState(
//     "Devi Ahilya Vishwavidyalaya, Indore"
//   );
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSupplierData = async () => {
//       console.log("🚀 Fetching supplier data...");
//       try {
//         setLoading(true);

//         // Fetch suppliers data
//         const suppliersRes = await fetch(
//           "http://localhost:5000/api/suppliers",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (suppliersRes.ok) {
//           const suppliersData = await suppliersRes.json();
//           setSuppliers(suppliersData);
//           console.log("✅ Suppliers fetched:", suppliersData);

//           // Set origin and destination from first supplier
//           if (suppliersData.length > 0) {
//             const firstSupplier = suppliersData[0];
//             console.log("ℹ️ Using first supplier for route:", firstSupplier);

//             // Set origin
//             if (firstSupplier.route && firstSupplier.route.origin) {
//               console.log("ℹ️ Setting origin to:", firstSupplier.route.origin);
//               setOrigin(firstSupplier.route.origin);
//             }

//             // Set destination (FIXED: was using origin instead of destination)
//             if (firstSupplier.route && firstSupplier.route.destination) {
//               console.log(
//                 "ℹ️ Setting destination to:",
//                 firstSupplier.route.destination
//               );
//               setDestination(firstSupplier.route.destination); // ✅ Fixed this line
//             }
//           }
//         } else {
//           console.warn("⚠️ Failed to fetch suppliers");
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("❌ Error fetching supplier data:", err);
//         setLoading(false);
//       }
//     };

//     fetchSupplierData();
//   }, []);

//   const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
//     origin
//   )}+to+${encodeURIComponent(destination)}&output=embed`;

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Dynamic Route Map</h2>

//       {loading && <Loader />}
//       <div style={styles.mapContainer}>
//         <iframe
//           width="100%"
//           height="400"
//           style={styles.iframe}
//           loading="lazy"
//           allowFullScreen
//           src={mapSrc}
//           title="Dynamic Map"
//         ></iframe>
//       </div>

//       {/* Horizontal Route Preview */}
//       <section style={styles.previewSection}>
//         <h3 style={styles.subHeading}>Route Preview</h3>
//         <div style={styles.horizontalLine}>
//           {/* Origin */}
//           <div style={styles.stop}>
//             <div style={{ ...styles.circle, background: "red" }}></div>
//             <span style={styles.label}>{origin}</span>
//           </div>

//           {/* Connector Line */}
//           <div style={styles.connector}></div>

//           {/* Destination */}
//           <div style={styles.stop}>
//             <div style={{ ...styles.circle, background: "green" }}></div>
//             <span style={styles.label}>{destination}</span>
//           </div>
//         </div>
//       </section>

//       {/* Supplier Info */}
//       {suppliers.length > 0 && (
//         <div style={styles.supplierInfo}>
//           <h4>Available Suppliers: {suppliers.length}</h4>
//           <p>
//             Currently showing route for:{" "}
//             {suppliers[0]?.name || "First Supplier"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "800px",
//     margin: "2rem auto",
//     padding: "1.5rem",
//     borderRadius: "12px",
//     background: "#fff",
//     boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
//     fontFamily: "Arial, sans-serif",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "1.5rem",
//     fontSize: "1.8rem",
//     color: "#333",
//   },
//   loading: {
//     textAlign: "center",
//     padding: "1rem",
//     background: "#f0f8ff",
//     borderRadius: "8px",
//     marginBottom: "1rem",
//     color: "#0066cc",
//     fontWeight: "bold",
//   },
//   mapContainer: {
//     marginBottom: "2rem",
//     borderRadius: "12px",
//     overflow: "hidden",
//   },
//   iframe: {
//     border: "0",
//   },
//   previewSection: {
//     textAlign: "center",
//   },
//   subHeading: {
//     marginBottom: "1.2rem",
//     color: "#444",
//     fontSize: "1.3rem",
//   },
//   horizontalLine: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     position: "relative",
//     margin: "2rem auto",
//     maxWidth: "90%",
//   },
//   stop: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: "40%",
//   },
//   circle: {
//     width: "18px",
//     height: "18px",
//     borderRadius: "50%",
//     border: "2px solid #333",
//     marginBottom: "0.5rem",
//   },
//   connector: {
//     flex: 1,
//     height: "3px",
//     background: "#0077cc",
//     margin: "0 1rem",
//   },
//   label: {
//     fontSize: "0.95rem",
//     fontWeight: "bold",
//     color: "#222",
//     textAlign: "center",
//   },
//   supplierInfo: {
//     marginTop: "1.5rem",
//     padding: "1rem",
//     background: "#f8f9fa",
//     borderRadius: "8px",
//     textAlign: "center",
//     color: "#555",
//   },
// };

// export default DynamicMap;
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react"; // Make sure this is installed: npm install lucide-react

const DynamicMap = () => {
  const [origin, setOrigin] = useState("Medicaps University, Indore");
  const [destination, setDestination] = useState(
    "Devi Ahilya Vishwavidyalaya, Indore"
  );
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true); // Changed initial state to true

  useEffect(() => {
    const fetchSupplierData = async () => {
      console.log("🚀 Fetching supplier data...");
      try {
        setLoading(true);

        const suppliersRes = await fetch(
          "http://localhost:5000/api/suppliers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (suppliersRes.ok) {
          const suppliersData = await suppliersRes.json();
          setSuppliers(suppliersData);
          console.log("✅ Suppliers fetched:", suppliersData);

          if (suppliersData.length > 0) {
            const firstSupplier = suppliersData[0];
            if (firstSupplier.route && firstSupplier.route.origin) {
              setOrigin(firstSupplier.route.origin);
            }
            if (firstSupplier.route && firstSupplier.route.destination) {
              setDestination(firstSupplier.route.destination);
            }
          }
        } else {
          console.warn("⚠️ Failed to fetch suppliers");
        }
      } catch (err) {
        console.error("❌ Error fetching supplier data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, []);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    origin
  )}+to+${encodeURIComponent(destination)}&output=embed`;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dynamic Route Map</h2>

      {loading ? (
        <div style={styles.loaderContainer}>
          <Loader style={styles.loaderIcon} />
          <p style={styles.loadingText}>Loading route...</p>
        </div>
      ) : (
        <>
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

          <section style={styles.previewSection}>
            <h3 style={styles.subHeading}>Route Preview</h3>
            <div style={styles.horizontalLine}>
              <div style={styles.stop}>
                <div style={{ ...styles.circle, background: "red" }}></div>
                <span style={styles.label}>{origin}</span>
              </div>
              <div style={styles.connector}></div>
              <div style={styles.stop}>
                <div style={{ ...styles.circle, background: "green" }}></div>
                <span style={styles.label}>{destination}</span>
              </div>
            </div>
          </section>

          {suppliers.length > 0 && (
            <div style={styles.supplierInfo}>
              <h4>Available Suppliers: {suppliers.length}</h4>
              <p>
                Currently showing route for:{" "}
                {suppliers[0]?.name || "First Supplier"}
              </p>
            </div>
          )}
        </>
      )}
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
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px", // Match map height
    border: "2px dashed #ccc",
    borderRadius: "12px",
    background: "#f8f8f8",
  },
  loaderIcon: {
    width: "50px",
    height: "50px",
    color: "#0077cc",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "1rem",
    color: "#555",
    fontSize: "1rem",
    fontWeight: "bold",
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
  supplierInfo: {
    marginTop: "1.5rem",
    padding: "1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    textAlign: "center",
    color: "#555",
  },
};

export default DynamicMap;