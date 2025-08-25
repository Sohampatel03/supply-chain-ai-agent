import React from 'react';

const Sidebar = ({ section, setSection }) => {
  const sidebarItems = [
    { key: "system", label: "System Analysis" },
    { key: "routes", label: "Route Management" },
    { key: "logistics", label: "Logistics" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "0",
        flexShrink: 0,
        height: "100vh", // ✅ full height of screen
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "1rem",
          borderBottom: "1px solid #34495e",
          backgroundColor: "#34495e",
          textAlign: "center",
        }}
      >
        Shrunkhla AI
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sidebarItems.map((item) => (
            <li
              key={item.key}
              style={{
                padding: "1rem 1.5rem",
                cursor: "pointer",
                backgroundColor:
                  section === item.key ? "#3498db" : "transparent",
                borderLeft:
                  section === item.key
                    ? "4px solid #2980b9"
                    : "4px solid transparent",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSection(item.key)}
              onMouseOver={(e) => {
                if (section !== item.key) {
                  e.currentTarget.style.backgroundColor = "#34495e";
                }
              }}
              onMouseOut={(e) => {
                if (section !== item.key) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
