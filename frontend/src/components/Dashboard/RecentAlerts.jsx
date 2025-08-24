import React from 'react';

const RecentAlerts = () => {
  const recentAlerts = [
    {
      id: 1,
      message:
        "Heavy rain and thunderstorms expected in Mumbai-Delhi route tomorrow.",
      type: "Weather",
      time: "2 hours ago",
    },
    {
      id: 2,
      message:
        "Border strike reported near checkpoint 3. Possible delays expected.",
      type: "Geopolitical",
      time: "5 hours ago",
    },
    {
      id: 3,
      message: "Fuel prices increased by 5% - operational costs may rise.",
      type: "Operational",
      time: "Today",
    },
    {
      id: 4,
      message: "Port congestion cleared - marine routes now operational.",
      type: "Marine",
      time: "1 day ago",
    },
    {
      id: 5,
      message: "New alternate route via Nashik recommended for faster delivery.",
      type: "Route",
      time: "2 days ago",
    },
  ];

  return (
    <section className="risk-panel">
      <h2>Recent Alerts</h2>
      <div className="alerts-list">
        {recentAlerts.map((alert) => (
          <div key={alert.id} className="alert-card">
            <b>{alert.type}:</b> {alert.message}
            <span className="alert-time">{alert.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentAlerts;
