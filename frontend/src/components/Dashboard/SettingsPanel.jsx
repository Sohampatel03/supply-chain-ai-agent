import React from 'react';

const SettingsPanel = () => {
  return (
    <section className="risk-panel-full">
      <h2>Settings</h2>
      <div style={{ color: "#274060", fontWeight: 500 }}>
        <div style={{ marginBottom: "1rem" }}>
          Notification Preferences: <input type="checkbox" defaultChecked />{" "}
          Email Alerts
        </div>
        <div>
          Theme:{" "}
          <select defaultValue="light">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SettingsPanel;
