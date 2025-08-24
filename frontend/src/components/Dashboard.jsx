// import React from "react";

// const Dashboard = () => {
//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h2>Dashboard</h2>
//       <p>This is a placeholder dashboard component.</p>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import MapEmbed from "./MapEmbed";

function Dashboard() {
  const origin = "Medicaps University, Indore, India";
  const destination = "Devi Ahilya Vishwavidyalaya, Indore, India";

  return (
    <div>
      <h1>Route Map</h1>
      <MapEmbed origin={origin} destination={destination} />
    </div>
  );
}

export default Dashboard;
