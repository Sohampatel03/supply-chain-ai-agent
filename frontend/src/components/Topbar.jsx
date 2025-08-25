import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Settings, LogOut, Menu, X } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const Topbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initial notifications with a 'read' status. The count starts with unread alerts.
  const initialNotifications = [
    {
      id: 1,
      message:
        "Heavy rain and thunderstorms expected in Mumbai-Delhi route tomorrow.",
      type: "Weather",
      severity: "warning",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message:
        "Border strike reported near checkpoint 3. Possible delays expected.",
      type: "Geopolitical",
      severity: "error",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      message: "Fuel prices increased by 5% - operational costs may rise.",
      type: "Operational",
      severity: "warning",
      time: "Today",
      read: true,
    },
    {
      id: 4,
      message: "Port congestion cleared - marine routes now operational.",
      type: "Marine",
      severity: "success",
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      message:
        "New alternate route via Nashik recommended for faster delivery.",
      type: "Route",
      severity: "info",
      time: "2 days ago",
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Calculate unread count dynamically
  const notificationCount = notifications.filter((n) => !n.read).length;

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // Mark all notifications as read when the dropdown is opened
    if (!showNotifications) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }
  };

  // A utility function to get the correct icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "Weather":
        return "🌧️";
      case "Geopolitical":
        return "⚠️";
      case "Operational":
        return "⛽";
      case "Marine":
        return "🚢";
      case "Route":
        return "🛣️";
      default:
        return "🔔";
    }
  };

  // A utility function to get the severity class for the colored dot
  const getSeverityClass = (severity) => {
    switch (severity) {
      case "error":
        return "dot-error";
      case "warning":
        return "dot-warning";
      case "success":
        return "dot-success";
      case "info":
        return "dot-info";
      default:
        return "";
    }
  };
  const navigate = useNavigate();

  // 3. New: A simple function for logging out
  const handleLogout = () => {
  // Clear all specified data from localStorage
  localStorage.removeItem('StartupName');
  localStorage.removeItem('user');
  localStorage.removeItem('inventoryForm');
  localStorage.removeItem('token');
  localStorage.removeItem('supplier');

  // Redirect the user to the login page
  navigate("/login");
};
  return (
    <div className="topbar">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo Section */}
      <div className="topbar-brand">
        <div className="topbar-logo">
          <span>S</span>
        </div>
        <div className="topbar-brand-text">
          <span className="brand-name">Shrunkhala</span>
          <span className="brand-suffix">AI</span>
        </div>
      </div>

      {/* Search Section */}
      <div className={`topbar-search ${isSearchFocused ? "focused" : ""}`}>
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search suppliers, routes, analytics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setSearchQuery("")}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Actions Section */}
      <div
        className={`topbar-actions ${isMobileMenuOpen ? "mobile-open" : ""}`}
      >
        {/* Notifications */}
        <div className="topbar-dropdown" ref={notificationRef}>
          <button
            className="topbar-icon notification-btn"
            onClick={handleNotificationClick}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown-menu notifications-menu">
              <div className="dropdown-header">
                <h4>Notifications</h4>
              </div>
              <div className="dropdown-content">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      notification.read ? "read" : "unread"
                    }`}
                  >
                    <div
                      className={`notification-dot ${getSeverityClass(
                        notification.severity
                      )}`}
                    ></div>
                    <div className="notification-content">
                      <p className="notification-message">
                        <span className="notification-icon">
                          {getNotificationIcon(notification.type)}
                        </span>
                        {notification.message}
                      </p>
                      <p className="notification-time">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="topbar-dropdown" ref={userMenuRef}>
          <button
            className="topbar-user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              <User size={18} />
            </div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Admin</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="dropdown-menu user-menu">
              <div className="dropdown-content">
                <button className="dropdown-item">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="dropdown-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item danger" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 2rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-radius: 0;
          box-shadow: 0 2px 20px rgba(39, 64, 96, 0.06);
          margin: 0;
          margin-bottom: 1.5rem;
          border: none;
          border-bottom: 1px solid rgba(168, 237, 234, 0.2);
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          width: 100vw;
          z-index: 100;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          min-height: 60px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #334155;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
        }

        .mobile-menu-btn:hover {
          background: rgba(168, 237, 234, 0.1);
        }

        .topbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .topbar-logo {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.125rem;
          color: #1e293b;
          box-shadow: 0 3px 10px rgba(168, 237, 234, 0.25);
          transition: transform 0.2s;
        }

        .topbar-logo:hover {
          transform: scale(1.05);
        }

        .topbar-brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .brand-suffix {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .topbar-search {
          flex: 1;
          max-width: 500px;
          margin: 0 2rem;
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(248, 250, 252, 0.8);
          border: 2px solid transparent;
          border-radius: 0.875rem;
          padding: 0.65rem 1rem;
          transition: all 0.3s ease;
        }

        .topbar-search:hover {
          background: rgba(248, 250, 252, 1);
          border-color: rgba(168, 237, 234, 0.3);
        }

        .topbar-search.focused {
          background: white;
          border-color: #a8edea;
          box-shadow: 0 0 0 4px rgba(168, 237, 234, 0.1);
        }

        .search-icon {
          color: #64748b;
          margin-right: 0.75rem;
          transition: color 0.2s;
        }

        .topbar-search.focused .search-icon {
          color: #1e293b;
        }

        .topbar-search input {
          flex: 1;
          border: none;
          background: none;
          font-size: 1rem;
          color: #1e293b;
          outline: none;
        }

        .topbar-search input::placeholder {
          color: #94a3b8;
        }

        .clear-search {
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: color 0.2s;
        }

        .clear-search:hover {
          color: #64748b;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .topbar-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          background: rgba(248, 250, 252, 0.8);
          border: none;
          border-radius: 0.875rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .topbar-icon:hover {
          background: rgba(168, 237, 234, 0.2);
          color: #1e293b;
          transform: translateY(-1px);
        }

        .notification-btn {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: 0.375rem;
          right: 0.375rem;
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 0.75rem;
          min-width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .topbar-user-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(248, 250, 252, 0.8);
          border: none;
          border-radius: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .topbar-user-btn:hover {
          background: rgba(168, 237, 234, 0.2);
          transform: translateY(-1px);
        }

        .user-avatar {
          width: 2.25rem;
          height: 2.25rem;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e293b;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.925rem;
          color: #1e293b;
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.775rem;
          color: #64748b;
          line-height: 1.2;
        }

        .topbar-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 232, 240, 0.8);
          min-width: 320px;
          overflow: hidden;
          z-index: 1000;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .dropdown-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .dropdown-content {
          padding: 0.5rem 0;
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          transition: background-color 0.2s;
          border-left: 4px solid transparent;
        }

        .notification-item.unread {
          background: #f8fafc;
          border-left-color: #3b82f6;
        }

        .notification-item.unread:hover {
          background: #eff6ff;
        }

        .notification-item.read {
          opacity: 0.7;
        }

        .notification-item.read:hover {
          background: #f1f5f9;
          opacity: 1;
        }

        .notification-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-error {
          background: #ef4444;
        }
        .dot-warning {
          background: #f59e0b;
        }
        .dot-success {
          background: #10b981;
        }
        .dot-info {
          background: #3b82f6;
        }

        .notification-content {
          flex: 1;
        }

        .notification-message {
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
          line-height: 1.4;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .notification-icon {
          font-size: 1rem;
        }

        .notification-time {
          margin: 0;
          font-size: 0.75rem;
          color: #64748b;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1.25rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.925rem;
          color: #374151;
          transition: background-color 0.2s;
          text-align: left;
        }

        .dropdown-item:hover {
          background: #f8fafc;
        }

        .dropdown-item.danger {
          color: #dc2626;
        }

        .dropdown-item.danger:hover {
          background: #fef2f2;
        }

        .dropdown-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 0.5rem 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .topbar {
            padding: 1rem 1.5rem;
          }

          .topbar-brand-text .brand-name {
            font-size: 1.125rem;
          }

          .topbar-search {
            position: fixed;
            top: 80px;
            left: 1rem;
            right: 1rem;
            margin: 0;
            max-width: none;
            z-index: 999;
            display: ${isSearchFocused ? "flex" : "none"};
          }

          .topbar-actions {
            position: fixed;
            top: 80px;
            left: 1rem;
            right: 1rem;
            background: white;
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            flex-direction: column;
            gap: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
          }

          .topbar-actions.mobile-open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }

          .dropdown-menu {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vw - 2rem);
            max-width: 400px;
          }
        }

        @media (max-width: 480px) {
          .topbar {
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
          }

          .topbar-logo {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
          }

          .topbar-brand-text .brand-name {
            font-size: 1rem;
          }

          .user-info {
            display: none;
          }

          .dropdown-menu {
            min-width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Topbar;
