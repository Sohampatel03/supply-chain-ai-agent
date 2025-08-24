import React, { useState } from 'react';
import './RecentAlerts.css';

const RecentAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "Heavy rain and thunderstorms expected in Mumbai-Delhi route tomorrow.",
      type: "Weather",
      severity: "warning",
      time: "2 hours ago",
      icon: "🌧️",
      read: false
    },
    {
      id: 2,
      message: "Border strike reported near checkpoint 3. Possible delays expected.",
      type: "Geopolitical",
      severity: "error",
      time: "5 hours ago",
      icon: "⚠️",
      read: false
    },
    {
      id: 3,
      message: "Fuel prices increased by 5% - operational costs may rise.",
      type: "Operational",
      severity: "warning",
      time: "Today",
      icon: "⛽",
      read: true
    },
    {
      id: 4,
      message: "Port congestion cleared - marine routes now operational.",
      type: "Marine",
      severity: "success",
      time: "1 day ago",
      icon: "🚢",
      read: true
    },
    {
      id: 5,
      message: "New alternate route via Nashik recommended for faster delivery.",
      type: "Route",
      severity: "info",
      time: "2 days ago",
      icon: "🛣️",
      read: false
    },
  ]);

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'error':
        return 'alert-severity-error';
      case 'warning':
        return 'alert-severity-warning';
      case 'success':
        return 'alert-severity-success';
      case 'info':
        return 'alert-severity-info';
      default:
        return 'alert-severity-info';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'var(--error-500)';
      case 'warning':
        return 'var(--warning-500)';
      case 'success':
        return 'var(--success-500)';
      case 'info':
        return 'var(--primary-500)';
      default:
        return 'var(--primary-500)';
    }
  };

  const markAsRead = (alertId) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const dismissAlert = (alertId) => {
    setAlerts(prevAlerts =>
      prevAlerts.filter(alert => alert.id !== alertId)
    );
  };

  const markAllAsRead = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => ({ ...alert, read: true }))
    );
  };

  return (
    <section className="recent-alerts-panel">
      <div className="alerts-header">
        <h2 className="alerts-title">
          <span className="alerts-icon">🔔</span>
          Recent Alerts
        </h2>
        <div className="alerts-count">
          {unreadCount > 0 && (
            <span className="count-badge">{unreadCount}</span>
          )}
          <span className="count-text">
            {unreadCount > 0 ? 'Unread' : 'All Read'}
          </span>
        </div>
      </div>
      
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div 
            key={alert.id} 
            className={`alert-card ${getSeverityClass(alert.severity)} ${alert.read ? 'alert-read' : 'alert-unread'}`}
            style={{
              '--alert-color': getSeverityColor(alert.severity),
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="alert-icon">
              {alert.icon}
            </div>
            
            <div className="alert-content">
              <div className="alert-header">
                <span className="alert-type">{alert.type}</span>
                <span className="alert-time">{alert.time}</span>
              </div>
              <p className="alert-message">{alert.message}</p>
            </div>
            
            <div className="alert-actions">
              {!alert.read && (
                <button 
                  className="alert-action-btn" 
                  title="Mark as read"
                  onClick={() => markAsRead(alert.id)}
                >
                  <span className="action-icon">✓</span>
                </button>
              )}
              <button 
                className="alert-action-btn" 
                title="Dismiss"
                onClick={() => dismissAlert(alert.id)}
              >
                <span className="action-icon">×</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="alerts-footer">
        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        )}
        <button className="view-all-btn">
          View All Alerts
          <span className="btn-icon">→</span>
        </button>
      </div>
    </section>
  );
};

export default RecentAlerts;
